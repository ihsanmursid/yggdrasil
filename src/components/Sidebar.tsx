import { useMemo, useState } from 'react';
import { yggdrasilData } from '../data/yggdrasilData';

interface Props {
  selectedId: string;
  visibleIds: Set<string>;
  onSelect: (id: string) => void;
  nodeCount: number;
  totalCount: number;
}

export function Sidebar({ selectedId, visibleIds, onSelect, nodeCount, totalCount }: Props) {
  const [openCat, setOpenCat] = useState<string | null>(null);

  const childrenOf = useMemo(() => {
    const m = new Map<string, string[]>();
    yggdrasilData.nodes.forEach((n) => {
      if (!n.parentId) return;
      if (!m.has(n.parentId)) m.set(n.parentId, []);
      m.get(n.parentId)!.push(n.id);
    });
    return m;
  }, []);

  const nodesById = useMemo(() => new Map(yggdrasilData.nodes.map((n) => [n.id, n])), []);

  // Level-1 branches grouped by category, in category order.
  const branchesByCat = useMemo(() => {
    const m = new Map<string, string[]>();
    yggdrasilData.categories.forEach((c) => m.set(c.id, []));
    yggdrasilData.nodes.forEach((n) => {
      if (n.level === 1 && m.has(n.category)) m.get(n.category)!.push(n.id);
    });
    return m;
  }, []);

  const colors = useMemo(() => {
    const m = new Map<string, string>();
    yggdrasilData.categories.forEach((c) => m.set(c.id, c.color));
    return m;
  }, []);

  return (
    <nav className="sidebar">
      <div className="side-head">
        <span className="side-title">Navigator</span>
        <span className="side-count">{nodeCount} / {totalCount} shown</span>
      </div>

      <ul className="catlist">
        {yggdrasilData.categories.map((cat) => {
          const branches = branchesByCat.get(cat.id) ?? [];
          if (branches.length === 0) return null;
          const open = openCat === cat.id;
          return (
            <li key={cat.id} className="catgroup">
              <button
                className={`catrow${open ? ' open' : ''}`}
                onClick={() => setOpenCat(open ? null : cat.id)}
              >
                <i style={{ background: cat.color }} />
                <span className="catname">{cat.label}</span>
                <span className="catnum">{branches.length}</span>
                <span className="catchev">{open ? '−' : '+'}</span>
              </button>
              {open && (
                <ul className="branchlist">
                  {branches.map((id) => {
                    const n = nodesById.get(id);
                    if (!n) return null;
                    const hidden = !visibleIds.has(id);
                    return (
                      <li key={id}>
                        <button
                          className={`branchrow${id === selectedId ? ' active' : ''}${hidden ? ' hidden' : ''}`}
                          onClick={() => onSelect(id)}
                          title={n.description}
                        >
                          {n.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div className="legend-box">
        <div className="legend-title">How to read the map</div>
        <ul className="legend-effects">
          <li>
            <svg width="34" height="10"><line x1="0" y1="5" x2="34" y2="5" stroke="#f59e0b" strokeWidth="3" /></svg>
            <span>Solid line = parent → child (hierarchy). Click a node to light up its branch.</span>
          </li>
          <li>
            <svg width="34" height="10"><line x1="0" y1="5" x2="34" y2="5" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" /></svg>
            <span>Dashed purple = cross-module relationship (feature A depends on B).</span>
          </li>
          <li>
            <span className="legend-dot ring0" /> Biggest node = root, size shrinks per level — read root → branches → details.
          </li>
        </ul>
      </div>

      <div className="side-hint">
        Tip: pick a category here, or click any node. Unopened branches stay
        collapsed until you open them.
      </div>
    </nav>
  );
}
