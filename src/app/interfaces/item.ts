import { Collaborator } from "./sector";

export interface Item {
  _id: string;
  title: string;
  description: string;
  collaborator: Collaborator;
  attributes: { [key: string]: string | number }[];
  created_at: Date;
}

export interface IItem {
  id: string;
  property: string;
  value: string | number;
  description: string;
  equipmentId: string;
  created_at: Date;
  updated_at: Date;
}
