export interface CrudOperation {
  id: string;
  label: string;
  type: 'create' | 'read' | 'update' | 'delete' | 'action';
  description?: string;
}

/** A single REST endpoint, as declared by an api_nest controller. */
export interface Endpoint {
  /** HTTP verb, uppercase. */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** Sub-path under the module base path, e.g. "/", "/:id", "/transfer-audit". */
  path: string;
  /** Short human label, e.g. "List all", "Create", "Soft-delete". */
  summary?: string;
  /** Input fields this endpoint expects (for POST/PUT/PATCH). */
  fields?: string[];
  /** Auth/permission note, e.g. required role or CASL ability. */
  auth?: string;
}

/** The backend module a feature maps to. */
export interface ApiSpec {
  /** Base route under the global /v1 prefix, e.g. "/v1/gradebookTables". */
  basePath: string;
  /** Source folder in api_nest, e.g. "gradebook-table". */
  module: string;
  endpoints: Endpoint[];
}

/** A place in the UI where this feature is reachable. */
export interface Screen {
  /** Which client: admin, teacher, student portal or shared. */
  portal: 'admin' | 'teacher' | 'student' | 'shared' | 'api';
  /** Route path, e.g. "/gradebook/:id". */
  path: string;
  /** What the screen is for. */
  note?: string;
}

/** Deep, technical feature specification. */
export interface FeatureSpec {
  /** Portal routes that expose this feature. */
  screens?: Screen[];
  /** Backend module + endpoints. */
  api?: ApiSpec;
  /** Required inputs to create/update the primary entity. */
  requiredFields?: { name: string; type?: string; note?: string }[];
  /** Free-form implementation notes / gotchas. */
  notes?: string[];
  /** Raw reference documentation copied from the team wiki (bbs-wiki), in markdown. */
  wiki?: string;
}

/** Portals a node is reachable from. "shared" = 2+ portals, "api" = backend only. */
export type Portal = 'admin' | 'teacher' | 'student' | 'shared' | 'api';

export interface SkillNode {
  id: string;
  title: string;
  category: string;
  description: string;
  level: number;
  parentId: string | null;
  crud: CrudOperation[];
  relatesTo: string[];
  tags: string[];
  /**
   * Which portal(s) expose this node.
   * L1/L2 nodes inherit from children; L3 nodes list every portal that shows them.
   */
  portals?: Portal[];
  /** Frontend route(s) relative to the portal base path. Empty for config-only nodes. */
  routes?: string[];
  /** Backend module names this node maps to (information, not a node). */
  modules?: string[];
  /** Endpoint paths called by this node. */
  endpoints?: string[];
  /** Team-wiki doc filenames referenced by this node, e.g. ["students.md"]. */
  wikiFiles?: string[];
  wikiFile?: string;
  /** Raw reference documentation copied from the team wiki (bbs-wiki), in markdown. */
  wiki?: string;
  /**
   * Plain-language explanation for non-technical users, derived by reading the
   * feature's code and wiki. Indonesian prose, English product terms kept.
   */
  userNote?: string;
  /** e.g. "GET×2, POST, PUT, DELETE — /v1/masterProducts" from api_nest */
  apiRoute?: string;
  /** Deep technical spec rendered in the detail panel. */
  spec?: FeatureSpec;
}

export interface YggdrasilData {
  categories: { id: string; label: string; color: string }[];
  nodes: SkillNode[];
}
