import { useCallback, useMemo, useState } from 'react';
import type { SkillNode } from './types';
import { skillTreeData } from './data/skillTreeData';
import { SkillTreeCanvas } from './components/SkillTreeCanvas';
import { DetailPanel } from './components/DetailPanel';
import { Sidebar } from './components/Sidebar';
import './styles.css';

const ROOT_ID = 'smartbag';

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(ROOT_ID);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const nodesById = useMemo(() => {
    const m = new Map<string, SkillNode>();
    skillTreeData.nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, []);

  const childrenOf = useMemo(() => {
    const m = new Map<string, string[]>();
    skillTreeData.nodes.forEach((n) => {
      if (!n.parentId) return;
      if (!m.has(n.parentId)) m.set(n.parentId, []);
      m.get(n.parentId)!.push(n.id);
    });
    return m;
  }, []);

  // Progressive disclosure is scoped to the current focus, not cumulative:
  // visible nodes = root + its level-1 children, + the ancestor path down to
  // the selected node (so the breadcrumb stays connected), + the selected
  // node's direct children. Selecting a different node closes what the
  // previous focus had opened.
  const revealedIds = useMemo(() => {
    const out = new Set<string>([ROOT_ID]);
    skillTreeData.nodes.forEach((n) => {
      if (n.parentId === ROOT_ID) out.add(n.id);
    });
    let cur = nodesById.get(selectedId);
    while (cur?.parentId) {
      out.add(cur.parentId);
      out.add(cur.id);
      cur = nodesById.get(cur.parentId);
    }
    (childrenOf.get(selectedId) ?? []).forEach((c) => out.add(c));
    return out;
  }, [selectedId, childrenOf, nodesById]);

  const matchIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return new Set(
      skillTreeData.nodes
        .filter((n) => (category === 'all' ? true : n.category === category))
        .filter((n) =>
          q
            ? n.title.toLowerCase().includes(q) ||
              n.description.toLowerCase().includes(q) ||
              n.id.includes(q)
            : true,
        )
        .map((n) => n.id),
    );
  }, [query, category]);

  // Search overrides progressive disclosure: when a query is active, show all
  // matches (plus their ancestors so the path stays visible).
  const visibleIds = useMemo(() => {
    const q = query.trim().length > 0 || category !== 'all';
    if (!q) return revealedIds;
    const out = new Set(matchIds);
    let cur = skillTreeData.nodes.filter((n) => matchIds.has(n.id));
    while (cur.length) {
      const next: SkillNode[] = [];
      cur.forEach((n) => {
        if (n.parentId && !out.has(n.parentId)) {
          out.add(n.parentId);
          const p = nodesById.get(n.parentId);
          if (p) next.push(p);
        }
      });
      cur = next;
    }
    return out;
  }, [query, category, matchIds, revealedIds, nodesById]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const selected = nodesById.get(selectedId) ?? nodesById.get(ROOT_ID)!;
  const visibleCount = visibleIds.size;
  const totalCount = skillTreeData.nodes.length;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Smartbag Skill Tree</h1>
          <p>
            Diablo-style map of every Smartbag feature. Start at the root, click
            a branch to expand it, click a node for CRUD detail.
          </p>
        </div>
        <div className="controls">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search features..."
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {skillTreeData.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          <button
            className="btn-ghost"
            onClick={() => {
              setSelectedId(ROOT_ID);
              setQuery('');
              setCategory('all');
            }}
          >
            Reset
          </button>
        </div>
      </header>

      <main className="layout">
        <Sidebar
          selectedId={selected.id}
          visibleIds={visibleIds}
          onSelect={handleSelect}
          nodeCount={visibleCount}
          totalCount={totalCount}
        />
        <SkillTreeCanvas
          selectedId={selected.id}
          visibleIds={visibleIds}
          onSelect={handleSelect}
        />
        <DetailPanel node={selected} nodesById={nodesById} onSelect={handleSelect} />
      </main>
    </div>
  );
}
