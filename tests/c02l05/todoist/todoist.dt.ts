export interface IDue {
  date: string;
  timezone: string;
  string: string;
  lang: string;
  is_recurring: boolean;
  datetime: string;
}

export interface ITaskModify {
  id?: string;
  content?: string;
  due_string?: string | null;
  is_completed?: boolean;
}

export interface ITaskClose {
  id: string;
}

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

export interface ITask {
  id: string;
  assigner_id: string | null;
  assignee_id: string | null;
  project_id: string;
  section_id: string | null;
  parent_id: string | null;
  order: number;
  content: string;
  description: string;
  is_completed: boolean;
  labels: string[];
  priority: number;
  comment_count: number;
  creator_id: string;
  created_at: string;
  due: IDue;
  url: string;
  duration: string | null;
}
