import { useState } from 'react';
import type { ReactNode } from 'react';
import type { CrudOperation, Endpoint, Screen, SkillNode } from '../types';

interface Props {
  node: SkillNode;
  nodesById: Map<string, SkillNode>;
  onSelect: (id: string) => void;
}

const CRUD_TYPE_LABEL: Record<CrudOperation['type'], string> = {
  create: 'Tambah',
  read: 'Lihat',
  update: 'Ubah',
  delete: 'Hapus',
  action: 'Aksi',
};

const CRUD_TYPE_COLOR: Record<CrudOperation['type'], string> = {
  create: '#22c55e',
  read: '#3b82f6',
  update: '#eab308',
  delete: '#ef4444',
  action: '#a855f7',
};

/** Plain-language verb shown in the "what you can do here" list. */
const CRUD_VERB: Record<CrudOperation['type'], string> = {
  create: 'Menambah data baru',
  read: 'Melihat data yang sudah ada',
  update: 'Mengubah data yang sudah ada',
  delete: 'Menghapus data',
  action: 'Menjalankan aksi khusus',
};

const METHOD_COLOR: Record<Endpoint['method'], string> = {
  GET: '#3b82f6',
  POST: '#22c55e',
  PUT: '#eab308',
  PATCH: '#f97316',
  DELETE: '#ef4444',
};

const PORTAL_LABEL: Record<Screen['portal'], string> = {
  admin: 'Admin',
  teacher: 'Guru',
  student: 'Siswa',
  shared: 'Semua portal',
  api: 'Sistem',
};

/** Who the feature is for, in business terms. */
const PORTAL_AUDIENCE: Record<Screen['portal'], string> = {
  admin: 'staf tata usaha / admin sekolah',
  teacher: 'guru',
  student: 'siswa',
  shared: 'admin dan guru',
  api: 'sistem (otomatis)',
};

/** Base path per portal so relative V3 routes render as full URLs. */
const PORTAL_BASE: Record<string, string> = {
  admin: '/admin',
  teacher: '/teacher',
  student: '/student',
};

/** One plain sentence describing what the whole feature lets a user do. */
function userSummary(node: SkillNode): string {
  const verbs = new Set(node.crud.map((c) => c.type));
  const parts: string[] = [];
  if (verbs.has('create')) parts.push('menambahkan');
  if (verbs.has('read')) parts.push('melihat');
  if (verbs.has('update')) parts.push('mengubah');
  if (verbs.has('delete')) parts.push('menghapus');
  if (parts.length === 0) return node.description;
  const joined =
    parts.length === 1
      ? parts[0]
      : parts.slice(0, -1).join(', ') + ' dan ' + parts[parts.length - 1];
  return `Lewat fitur ini Anda bisa ${joined} data ${node.title.toLowerCase()}.`;
}

/** Deduced "who uses it" line from the recorded screens. */
function audienceLine(node: SkillNode): string | null {
  const portals = new Set((node.spec?.screens ?? []).map((s) => s.portal));
  if (portals.size === 0) return null;
  const labels = [...portals].map((p) => PORTAL_AUDIENCE[p]);
  const unique = [...new Set(labels)];
  if (unique.length === 1) return `Dipakai oleh ${unique[0]}.`;
  return `Dipakai oleh ${unique.slice(0, -1).join(', ')} dan ${unique[unique.length - 1]}.`;
}

/** Split ``code`` spans out of a line so they render as <code>. */
// The wiki markdown links to sibling files (e.g. `file-sharing.md`,
// `../docs/x.md`). We bundle those files under `public/wiki/`, so every
// `.md` reference resolves to the raw copy in the repo.
const WIKI_RAW_BASE = 'https://raw.githubusercontent.com/ihsanmursid/yggdrasil/main/public/wiki/';

function wikiHref(target: string): string {
  // Keep absolute URLs untouched; map any *.md to the bundled wiki file.
  if (/^https?:\/\//.test(target)) return target;
  const file = target.split(/[\\/]/).pop() ?? target;
  return WIKI_RAW_BASE + file;
}

function renderInline(text: string): ReactNode[] {
  // Split on inline code and markdown links `[label](target)`.
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="wiki-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          className="wiki-link"
          href={wikiHref(link[2])}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link[1]}
        </a>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}

/**
 * Minimal markdown renderer for the team-wiki excerpts we embed: `##`/`###`
 * headings, `-` bullets, and inline ``code``. Anything else is a paragraph.
 */
function WikiMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="wiki-list">
        {bullets.map((b, i) => (
          <li key={i}>{renderInline(b)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (line.startsWith('- ')) {
      bullets.push(line.slice(2));
      continue;
    }
    flushBullets();
    if (line.trim() === '') continue;
    if (line.startsWith('### ')) {
      blocks.push(
        <h5 key={blocks.length} className="wiki-h">
          {renderInline(line.slice(4))}
        </h5>,
      );
    } else if (line.startsWith('## ')) {
      blocks.push(
        <h4 key={blocks.length} className="wiki-h">
          {renderInline(line.slice(3))}
        </h4>,
      );
    } else {
      blocks.push(
        <p key={blocks.length} className="wiki-p">
          {renderInline(line)}
        </p>,
      );
    }
  }
  flushBullets();
  return <div className="wiki">{blocks}</div>;
}

export function DetailPanel({ node, nodesById, onSelect }: Props) {
  const [showTech, setShowTech] = useState(false);

  const children = [...(nodesById.values() as Iterable<SkillNode>)].filter(
    (n) => n.parentId === node.id,
  );
  const parents =
    node.parentId && nodesById.has(node.parentId) ? [nodesById.get(node.parentId)!] : [];
  const related = node.relatesTo
    .map((id) => nodesById.get(id))
    .filter((n): n is SkillNode => !!n);

  const spec = node.spec;
  const screens = spec?.screens ?? [];
  const api = spec?.api;
  const requiredFields = spec?.requiredFields ?? [];
  const notes = spec?.notes ?? [];
  const wiki = node.wiki ?? spec?.wiki;
  const userNote = node.userNote;
  const routes = node.routes ?? [];
  const wikiFiles = node.wikiFiles ?? (node.wikiFile ? [node.wikiFile] : []);

  // Collapse duplicate CRUD verbs: "menambah" once, not five times.
  const crudByType = new Map<CrudOperation['type'], CrudOperation[]>();
  for (const c of node.crud) {
    const list = crudByType.get(c.type) ?? [];
    list.push(c);
    crudByType.set(c.type, list);
  }

  return (
    <aside className="detail">
      <hgroup>
        <h2>{node.title}</h2>
        <p className="detail-id">{node.category}</p>
      </hgroup>

      <section>
        <h3>Ringkasan</h3>
        <p>{node.description}</p>
        {userNote && <div className="user-note">{userNote}</div>}
        <p className="detail-plain">{userSummary(node)}</p>
        {audienceLine(node) && <p className="detail-audience">{audienceLine(node)}</p>}
        {node.tags.length > 0 && (
          <ul className="taglist">
            {node.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Yang bisa Anda lakukan</h3>
        {node.crud.length === 0 ? (
          <p className="muted">Fitur ini belum punya daftar aksi yang tercatat.</p>
        ) : (
          <ul className="crudlist">
            {[...crudByType.entries()].map(([type, ops]) => (
              <li key={type}>
                <span className="crud-badge" style={{ background: CRUD_TYPE_COLOR[type] }}>
                  {CRUD_TYPE_LABEL[type]}
                </span>
                <span className="crud-plain">
                  {ops.length > 1 ? `${CRUD_VERB[type]} (${ops.length} aksi)` : CRUD_VERB[type]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {screens.length > 0 && (
        <section>
          <h3>Di mana mencarinya</h3>
          <ul className="screenlist">
            {screens.map((s) => (
              <li key={`${s.portal}-${s.path}`}>
                <span className={`screen-badge portal-${s.portal}`}>
                  {PORTAL_LABEL[s.portal]}
                </span>
                <span className="screen-where">
                  {s.note ?? `Halaman ${s.path.replace(/^\//, '').replace(/[/:]/g, ' ')}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {routes.length > 0 && screens.length === 0 && (
        <section>
          <h3>Route frontend</h3>
          <ul className="screenlist">
            {routes.map((r) => {
              const bases = (node.portals ?? []).filter((p) => p !== 'api' && p !== 'shared');
              const base = bases[0] ? PORTAL_BASE[bases[0]] ?? '' : '';
              return (
                <li key={r}>
                  <span className="screen-badge portal-api">Route</span>
                  <code className="screen-where">{base + r}</code>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {(wiki || wikiFiles.length > 0 || api || requiredFields.length > 0 || node.apiRoute || (node.modules?.length ?? 0) > 0 || (node.endpoints?.length ?? 0) > 0) && (
        <section className="tech-section">
          <button
            className="tech-toggle"
            aria-expanded={showTech}
            onClick={() => setShowTech((v) => !v)}
          >
            <span className="tech-caret">{showTech ? '▾' : '▸'}</span>
            Detail teknis (untuk developer)
          </button>

          {showTech && (
            <div className="tech-body">
              {wiki && (
                <div className="tech-block">
                  <h4>Referensi dokumentasi</h4>
                  <WikiMarkdown text={wiki} />
                </div>
              )}
              {!wiki && wikiFiles.length > 0 && (
                <div className="tech-block">
                  <h4>Dokumentasi</h4>
                  <ul className="wikifilelist">
                    {wikiFiles.map((f) => (
                      <li key={f}>
                        <a className="wiki-link" href={wikiHref(f)} target="_blank" rel="noreferrer">
                          bbs-wiki/{f}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!api && !node.apiRoute && ((node.modules?.length ?? 0) > 0 || (node.endpoints?.length ?? 0) > 0) && (
                <div className="tech-block">
                  <h4>Backend</h4>
                  {(node.modules?.length ?? 0) > 0 && (
                    <p className="api-base">
                      <span className="api-module">modul:</span>
                      {node.modules!.map((m) => (
                        <code key={m} className="field-chip">
                          {m}
                        </code>
                      ))}
                    </p>
                  )}
                  {(node.endpoints?.length ?? 0) > 0 && (
                    <ul className="endpointlist">
                      {node.endpoints!.map((e) => (
                        <li key={e} className="endpoint">
                          <code className="route">{e}</code>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {api && (
                <div className="tech-block">
                  <h4>Alamat API</h4>
                  <p className="api-base">
                    <code>{api.basePath}</code>
                    <span className="api-module">modul: {api.module}</span>
                  </p>
                  <ul className="endpointlist">
                    {api.endpoints.map((e, i) => (
                      <li key={`${e.method}-${e.path}-${i}`} className="endpoint">
                        <div className="endpoint-head">
                          <span
                            className="method-badge"
                            style={{ background: METHOD_COLOR[e.method] }}
                          >
                            {e.method}
                          </span>
                          <code className="route">{e.path}</code>
                          {e.summary && <span className="endpoint-summary">{e.summary}</span>}
                        </div>
                        {e.fields && e.fields.length > 0 && (
                          <div className="endpoint-fields">
                            <span className="fields-label">body:</span>
                            {e.fields.map((f) => (
                              <code key={f} className="field-chip">
                                {f}
                              </code>
                            ))}
                          </div>
                        )}
                        {e.auth && <div className="endpoint-auth">requires: {e.auth}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!api && node.apiRoute && (
                <div className="tech-block">
                  <h4>Alamat API</h4>
                  <p className="api-base">
                    <code>{node.apiRoute}</code>
                  </p>
                </div>
              )}

              {requiredFields.length > 0 && (
                <div className="tech-block">
                  <h4>Kolom yang wajib diisi</h4>
                  <ul className="fieldlist">
                    {requiredFields.map((f) => (
                      <li key={f.name}>
                        <code className="field-name">{f.name}</code>
                        {f.type && <span className="field-type">{f.type}</span>}
                        {f.note && <span className="field-note">{f.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {notes.length > 0 && (
        <section>
          <h3>Catatan penting</h3>
          <ul className="notelist">
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>
      )}

      {parents.length > 0 && (
        <section>
          <h3>Bagian dari</h3>
          <button className="node-link" onClick={() => onSelect(parents[0].id)}>
            {parents[0].title}
          </button>
        </section>
      )}

      <section>
        <h3>Isi di dalamnya ({children.length})</h3>
        {children.length === 0 ? (
          <p className="muted">Tidak ada sub-fitur — ini fitur paling kecil.</p>
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
        <h3>Terkait dengan ({related.length})</h3>
        {related.length === 0 ? (
          <p className="muted">Tidak ada keterkaitan dengan fitur lain.</p>
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
