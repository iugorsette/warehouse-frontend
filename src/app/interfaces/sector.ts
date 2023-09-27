import { Item } from "./item";

export interface Sector {
  id: string;
  title: string;
  colaborattors: Collaborator[];
  created_at: Date;
  updated_at: Date;
}

export interface Collaborator {
  id?: string;
  name: string;
  role: string;
  sector: string;
  items?: Item[];
  created_at?: Date;
  updated_at?: Date;
}
