export interface CrudOperation {
  id: string;
  label: string;
  type: 'create' | 'read' | 'update' | 'delete' | 'action';
  description?: string;
}

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
  wikiFile?: string;
  /** e.g. "GET×2, POST, PUT, DELETE — /v1/masterProducts" from api_nest */
  apiRoute?: string;
}

export interface SkillTreeData {
  categories: { id: string; label: string; color: string }[];
  nodes: SkillNode[];
}
