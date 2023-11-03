export interface Project {
  color?: string;
  comment_count?: number;
  id?: string;
  is_favorite?: boolean;
  is_inbox_project?: boolean;
  is_share?: boolean;
  is_team_inbox?: boolean;
  name: string;
  order?: number;
  parent_id?: null;
  url?: string;
  view_style?: string;
}
