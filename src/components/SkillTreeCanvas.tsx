import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { skillTreeData } from '../data/skillTreeData';

interface Props {
  selectedId: string;
  visibleIds: Set<string>;
  onSelect: (id: string) => void;
}

// Radial geometry, sized for the COLLAPSED-by-default view: only the root's
// category children (9) plus the focused node's direct children are ever on
// screen at once. The largest real fan-out is 13 children (the `sve` module),
// so compact rings hold them without overlap — no giant tree. Radii below are
// the minimum circumference (N × (w+gap) / 2π) plus generous margin.
const RING_RADII = [0, 520, 860, 1120]; // absolute radius per depth (px)
const NODE_W = [280, 200, 172, 156];    // rendered width per level (px)
const NODE_H = [104, 74, 62, 56];       // rendered height per level (px)

const widthFor = (level: number) => NODE_W[Math.min(level, NODE_W.length - 1)];
const heightFor = (level: number) => NODE_H[Math.min(level, NODE_H.length - 1)];
const radiusFor = (level: number) => RING_RADII[Math.min(level, RING_RADII.length - 1)];

// Selection only dims non-related nodes and pans the camera; the layout itself
// never moves, so edges stay put and nothing piles up on top of anything else.
const PULL_MS = 620;           // must match the .canvas-inner transition

type Placed = { x: number; y: number; angle: number; depth: number; w: number; h: number };

export function SkillTreeCanvas({ selectedId, visibleIds, onSelect }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 400, y: 340 });
  const [zoom, setZoom] = useState(0.5);
  const [animating, setAnimating] = useState(false);
  const drag = useRef<{ sx: number; sy: number; px: number; py: number; moved: boolean } | null>(null);

  const catColor = useMemo(() => {
    const m = new Map<string, string>();
    skillTreeData.categories.forEach((c) => m.set(c.id, c.color));
    return m;
  }, []);

  const nodesById = useMemo(() => new Map(skillTreeData.nodes.map((n) => [n.id, n])), []);

  const childrenOf = useMemo(() => {
    const m = new Map<string, string[]>();
    skillTreeData.nodes.forEach((n) => {
      if (!n.parentId) return;
      if (!m.has(n.parentId)) m.set(n.parentId, []);
      m.get(n.parentId)!.push(n.id);
    });
    return m;
  }, []);

  // Subtree sizes for angular sector allocation (Yggdrasil radial tree)
  const subSize = useMemo(() => {
    const memo = new Map<string, number>();
    const calc = (id: string): number => {
      if (memo.has(id)) return memo.get(id)!;
      const kids = childrenOf.get(id) ?? [];
      const s = 1 + kids.reduce((a, c) => a + calc(c), 0);
      memo.set(id, s);
      return s;
    };
    skillTreeData.nodes.forEach((n) => calc(n.id));
    return memo;
  }, [childrenOf]);

  const pos = useMemo(() => {
    const p = new Map<string, Placed>();

    // ── Stage 1: angular packing ──────────────────────────────────────────
    // Each sibling subtree is allocated an angular span proportional to how
    // much room its nodes actually need (their box widths), not just their
    // count. This stops a narrow-sector parent from squeezing its children.
    const spanNeed = (id: string, depth: number): number => {
      const r = Math.max(1, radiusFor(depth));
      const own = (widthFor(depth) + 40) / r; // minimum arc for this node
      const kids = childrenOf.get(id) ?? [];
      if (kids.length === 0) return own;
      const childSpan = kids.reduce((a, c) => a + spanNeed(c, depth + 1), 0);
      return Math.max(own, childSpan);
    };

    const place = (id: string, angleStart: number, angleEnd: number, depth: number) => {
      const angle = (angleStart + angleEnd) / 2;
      const r = radiusFor(depth);
      const w = widthFor(depth);
      const h = heightFor(depth);
      p.set(id, { x: Math.cos(angle) * r, y: Math.sin(angle) * r, angle, depth, w, h });

      const kids = childrenOf.get(id) ?? [];
      if (kids.length === 0) return;

      const needs = kids.map((c) => spanNeed(c, depth + 1));
      const total = needs.reduce((a, b) => a + b, 0) || 1;
      const avail = angleEnd - angleStart;
      // Split children preserving parent order (stable, so layout is stable).
      let cur = angleStart;
      kids.forEach((c, i) => {
        const span = (avail * needs[i]) / total;
        place(c, cur, cur + span, depth + 1);
        cur += span;
      });
    };
    place('smartbag', 0, Math.PI * 2, 0);

    // Stage 1 can leave two siblings close when their subtrees have very
    // different sizes. Re-space each parent's children evenly across the span
    // they already occupy, so same-parent nodes never collide with each other
    // (this is the exact case the collapse gate creates: a parent's children
    // become co-visible while its neighbours' children do not). Runs AFTER the
    // global separation pass so sibling spacing has the final word.
    const respace = (id: string) => {
      const kids = childrenOf.get(id) ?? [];
      const parent = p.get(id);
      if (!parent || kids.length === 0) return;
      const childDepth = parent.depth + 1;
      const r = Math.max(1, radiusFor(childDepth));
      const minArc = (widthFor(childDepth) + 32) / r;
      let a0 = Infinity, a1 = -Infinity;
      kids.forEach((c) => {
        const v = p.get(c);
        if (!v) return;
        a0 = Math.min(a0, v.angle);
        a1 = Math.max(a1, v.angle);
      });
      if (!isFinite(a0)) return;
      const span = Math.max(a1 - a0, kids.length * minArc);
      const start = (a0 + a1) / 2 - span / 2;
      kids.forEach((c, i) => {
        const v = p.get(c);
        if (!v) return;
        const angle = start + (span * (i + 0.5)) / kids.length;
        p.set(c, { ...v, angle, x: Math.cos(angle) * r, y: Math.sin(angle) * r });
        respace(c);
      });
    };
    // Orphans (no parent chain) — park on the outer ring.
    skillTreeData.nodes.forEach((n) => {
      if (!p.has(n.id)) {
        const depth = 2;
        p.set(n.id, { x: radiusFor(depth), y: 0, angle: 0, depth, w: widthFor(depth), h: heightFor(depth) });
      }
    });

    // ── Stage 2: radial separation on real (axis-aligned) boxes ───────────
    // Work per ring, but compare ACTUAL boxes in x/y for EVERY pair — not just
    // adjacent ones. Push overlapping neighbours apart along the ring until the
    // boxes no longer intersect.
    const box = (v: Placed) => ({
      l: v.x - v.w / 2, r: v.x + v.w / 2,
      t: v.y - v.h / 2, b: v.y + v.h / 2,
    });
    const overlaps = (a: Placed, b: Placed) => {
      const A = box(a), B = box(b);
      const gap = 24; // desired clearance between boxes
      return A.l - gap < B.r && A.r + gap > B.l && A.t - gap < B.b && A.b + gap > B.t;
    };

    const byDepth = new Map<number, string[]>();
    p.forEach((v, id) => {
      if (!byDepth.has(v.depth)) byDepth.set(v.depth, []);
      byDepth.get(v.depth)!.push(id);
    });

    byDepth.forEach((ids, depth) => {
      if (depth === 0 || ids.length < 2) return;
      const r = radiusFor(depth);
      for (let pass = 0; pass < 2000; pass++) {
        let moved = false;
        for (let i = 0; i < ids.length; i++) {
          for (let j = i + 1; j < ids.length; j++) {
            const a = p.get(ids[i])!;
            const b = p.get(ids[j])!;
            if (!overlaps(a, b)) continue;
            // Determine which way to push: shorter route around the ring.
            let d = b.angle - a.angle;
            while (d > Math.PI) d -= Math.PI * 2;
            while (d < -Math.PI) d += Math.PI * 2;
            const dir = d >= 0 ? 1 : -1;
            // Arc step that clears the two boxes, converted to an angle.
            const step = (a.w / 2 + b.w / 2 + 32) / r / 2;
            const na = a.angle - dir * step;
            const nb = b.angle + dir * step;
            p.set(ids[i], { ...a, angle: na, x: Math.cos(na) * r, y: Math.sin(na) * r });
            p.set(ids[j], { ...b, angle: nb, x: Math.cos(nb) * r, y: Math.sin(nb) * r });
            moved = true;
          }
        }
        if (!moved) break;
      }
    });

    // Final pass: sibling spacing, so a parent's own children hold their
    // positions even after the global separation above re-shuffled their ring.
    respace('smartbag');

    return p;
  }, [childrenOf, subSize]);

  const ancestors = useCallback(
    (id: string): string[] => {
      const chain: string[] = [];
      let cur = nodesById.get(id);
      while (cur?.parentId) {
        chain.unshift(cur.parentId);
        cur = nodesById.get(cur.parentId);
      }
      return chain;
    },
    [nodesById],
  );

  const selected = nodesById.get(selectedId);

  // Set of nodes that stay bright when a node is focused: the node itself, its
  // ancestry (so you keep the path back to the root), its direct children and
  // anything it relates to. Nodes never move — this only drives the dimming.
  const focusSet = useMemo(() => {
    const s = new Set<string>([selectedId]);
    ancestors(selectedId).forEach((a) => s.add(a));
    (childrenOf.get(selectedId) ?? []).forEach((c) => s.add(c));
    selected?.relatesTo.forEach((r) => s.add(r));
    return s;
  }, [selectedId, selected, childrenOf, ancestors]);

  // Animated zoom-to-node on selection. The layout is static; only the camera
  // moves so the focused node is centred when clicked.
  const flyTo = useCallback(
    (id: string, instant = false) => {
      const el = wrapRef.current;
      const target = pos.get(id);
      if (!el || !target) return;
      const w = el.clientWidth || 800;
      const h = el.clientHeight || 600;
      const depth = target.depth;
      const z = depth === 0 ? 0.5 : depth === 1 ? 0.85 : 1.25;
      const px = w / 2 - target.x * z;
      const py = h / 2 - target.y * z;
      if (instant) {
        setPan({ x: px, y: py });
        setZoom(z);
        return;
      }
      setAnimating(true);
      setPan({ x: px, y: py });
      setZoom(z);
      window.setTimeout(() => setAnimating(false), PULL_MS + 30);
    },
    [pos],
  );

  useEffect(() => {
    flyTo(selectedId);
  }, [selectedId, flyTo]);

  // Initial centering
  useEffect(() => {
    flyTo('smartbag', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setAnimating(false);
      setZoom((z) => Math.min(2.2, Math.max(0.25, z - Math.sign(e.deltaY) * 0.09)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const chain = useMemo(() => [...ancestors(selectedId), selectedId], [ancestors, selectedId]);
  const nodes = skillTreeData.nodes.filter((n) => visibleIds.has(n.id));
  // Overview = nothing but the root is selected. In that state the connector
  // lines are just noise, so they get blurred out.
  const isOverview = selectedId === 'smartbag';

  // Minimap bounds — use the overview layout so the world tree shape is stable
  // even while the main canvas is focused on a pulled-in node.
  const bounds = useMemo(() => {
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    pos.forEach((v) => {
      minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
    });
    return { minX, maxX, minY, maxY };
  }, [pos]);

  const toMini = useCallback(
    (x: number, y: number) => {
      const W = 150, H = 150, pad = 10;
      const sx = (W - pad * 2) / Math.max(1, bounds.maxX - bounds.minX);
      const sy = (H - pad * 2) / Math.max(1, bounds.maxY - bounds.minY);
      const s = Math.min(sx, sy);
      return {
        x: pad + (x - bounds.minX) * s,
        y: pad + (y - bounds.minY) * s,
      };
    },
    [bounds],
  );

  return (
    <div
      ref={wrapRef}
      className="canvas ygg"
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest('.canvas-ui')) return;
        drag.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y, moved: false };
      }}
      onMouseMove={(e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.sx;
        const dy = e.clientY - drag.current.sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
        setAnimating(false);
        setPan({ x: drag.current.px + dx, y: drag.current.py + dy });
      }}
      onMouseUp={() => (drag.current = null)}
      onMouseLeave={() => (drag.current = null)}
    >
      <div
        className={`canvas-inner${animating ? ' anim' : ''}`}
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        <svg className={`edges${isOverview ? ' overview' : ''}`}>
          {nodes.flatMap((n) => {
            const from = pos.get(n.id);
            if (!n.parentId || !from || !pos.has(n.parentId) || !visibleIds.has(n.parentId)) return [];
            const to = pos.get(n.parentId)!;
            const inFocus = focusSet.has(n.id) && focusSet.has(n.parentId);
            const dim = !isOverview && !inFocus;
            return [
              <line
                key={`${n.id}-p`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                className={`edge${inFocus ? ' hot' : ''}${dim ? ' dim' : ''}`}
              />,
            ];
          })}
          {!isOverview &&
            selected?.relatesTo
              .filter((r) => pos.has(r) && visibleIds.has(r))
              .map((r) => {
                const a = pos.get(selectedId)!;
                const b = pos.get(r)!;
                return <line key={`rel-${r}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="edge rel" />;
              })}
        </svg>
        {nodes.map((n) => {
          const p = pos.get(n.id);
          if (!p) return null;
          const isSel = n.id === selectedId;
          const inFocus = focusSet.has(n.id);
          const dimmed = selectedId !== 'smartbag' && !inFocus;
          const kids = childrenOf.get(n.id) ?? [];
          return (
            <button
              key={n.id}
              className={`node ring-${Math.min(p.depth, 3)}${isSel ? ' selected' : ''}${inFocus ? ' hot' : ''}${dimmed ? ' dimmed' : ''}${n.level === 0 ? ' root' : ''}`}
              style={{
                left: p.x,
                top: p.y,
                width: p.w,
                minHeight: p.h,
                ['--node-color' as string]: catColor.get(n.category) ?? '#888',
              }}
              onClick={() => {
                if (drag.current?.moved) return;
                onSelect(n.id);
              }}
              title={n.description}
            >
              <span className="node-lvl">
                {n.level === 0 ? 'YGGDRASIL' : `Lv ${n.level}`}
                {kids.length > 0 ? ` · ${kids.length}` : ''}
              </span>
              <span className="node-title">{n.title}</span>
              {n.crud.length > 0 && <span className="node-crud">{n.crud.length} ops</span>}
            </button>
          );
        })}
      </div>

      {/* Breadcrumb */}
      <div className="canvas-ui breadcrumb">
        {chain.map((id, i) => {
          const n = nodesById.get(id);
          if (!n) return null;
          const last = i === chain.length - 1;
          return (
            <span key={id} className="crumb-wrap">
              {i > 0 && <span className="crumb-sep">›</span>}
              <button
                className={`crumb${last ? ' current' : ''}`}
                onClick={() => onSelect(id)}
              >
                {i === 0 ? 'Overview' : n.title}
              </button>
            </span>
          );
        })}
      </div>

      {/* Zoom controls */}
      <div className="canvas-ui zoomctl">
        <button onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))}>+</button>
        <button onClick={() => setZoom((z) => Math.max(0.25, z - 0.15))}>−</button>
        <button className="wide" onClick={() => onSelect('smartbag')}>Overview</button>
      </div>

      {/* Minimap macro overview */}
      <div className="canvas-ui minimap">
        <div className="minimap-title">World tree</div>
        <svg width="150" height="150">
          {skillTreeData.nodes.map((n) => {
            const p = pos.get(n.id);
            if (!p) return null;
            const m = toMini(p.x, p.y);
            const isSel = n.id === selectedId;
            return (
              <circle
                key={n.id}
                cx={m.x} cy={m.y}
                r={isSel ? 4 : n.level === 0 ? 5 : n.level === 1 ? 3 : 1.8}
                fill={isSel ? '#fff' : catColor.get(n.category) ?? '#888'}
                opacity={isSel ? 1 : focusSet.has(n.id) || selectedId === 'smartbag' ? 0.85 : 0.3}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelect(n.id)}
              />
            );
          })}
        </svg>
      </div>

      <div className="canvas-hint">Click a branch to zoom in · Overview to zoom out · Drag to pan · Scroll to zoom</div>
    </div>
  );
}
