import type { CrudOperation, SkillNode } from '../types';

interface Props {
  node: SkillNode;
  nodesById: Map<string, SkillNode>;
  onSelect: (id: string) => void;
}

const CRUD_TYPE_LABEL: Record<CrudOperation['type'], string> = {
  create: 'CREATE',
  read: 'READ',
  update: 'UPDATE',
  delete: 'DELETE',
  action: 'ACTION',
};

const CRUD_TYPE_COLOR: Record<CrudOperation['type'], string> = {
  create: '#22c55e',
  read: '#3b82f6',
  update: '#eab308',
  delete: '#ef4444',
  action: '#a855f7',
};

export function DetailPanel({ node, nodesById, onSelect }: Props) {
  const children = [...(nodesById.values() as Iterable<SkillNode>)]
    .filter((n) => n.parentId === node.id);
  const parents =
    node.parentId && nodesById.has(node.parentId)
      ? [nodesById.get(node.parentId)!]
      : [];
  const related = node.relatesTo
    .map((id) => nodesById.get(id))
    .filter((n): n is SkillNode => !!n);

  return (
    <aside className="detail">
      <hgroup>
        <h2>{node.title}</h2>
        <p className="detail-id">#{node.id} · Level {node.level}</p>
      </hgroup>

      <section>
        <h3>Description</h3>
        <p>{node.description}</p>
        {node.apiRoute && <p className="detail-src">API (api_nest): {node.apiRoute}</p>}
        {node.wikiFile && <p className="detail-src">Source: bbs-wiki/{node.wikiFile}</p>}
        {node.tags.length > 0 && (
          <ul className="taglist">{node.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        )}
      </section>

      <section>
        <h3>CRUD / Operations ({node.crud.length})</h3>
        {node.crud.length === 0 ? (
          <p className="muted">No operations recorded for this node yet.</p>
        ) : (
          <ul className="crudlist">
            {node.crud.map((c) => (
              <li key={c.id}>
                <span className="crud-badge" style={{ background: CRUD_TYPE_COLOR[c.type] }}>
                  {CRUD_TYPE_LABEL[c.type]}
                </span>
                {c.label}
              </li>
            ))}
          </ul>
        )}
      </section>

      {parents.length > 0 && (
        <section>
          <h3>Parent</h3>
          <button className="node-link" onClick={() => onSelect(parents[0].id)}>
            {parents[0].title}
          </button>
        </section>
      )}

      <section>
        <h3>Children ({children.length})</h3>
        {children.length === 0 ? (
          <p className="muted">Leaf node — no children.</p>
        ) : (
          <ul className="linklist">
            {children.map((c) => (
              <li key={c.id}>
                <button className="node-link" onClick={() => onSelect(c.id)}>
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Relationships ({related.length})</h3>
        {related.length === 0 ? (
          <p className="muted">No cross-module relationships recorded.</p>
        ) : (
          <ul className="linklist">
            {related.map((r) => (
              <li key={r.id}>
                <button className="node-link rel" onClick={() => onSelect(r.id)}>
                  {r.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}