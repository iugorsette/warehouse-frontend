import { Item } from "./item";

export interface Sector {
  _id: string;
  title: string;
  colaborattors: Collaborator[];
  created_at: Date;
  updated_at: Date;
}

export interface Collaborator {
  _id?: string;
  name: string;
  role: string;
  sector: string;
  items?: Item[];
  created_at?: Date;
  updated_at?: Date;
}
