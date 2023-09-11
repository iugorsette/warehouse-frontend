import { Collaborator } from "./sector";

export interface IEquipment {
  _id: string;
  title: string;
  description: string;
  collaborator: Collaborator;
  attributes: { [key: string]: string | number }[];
  created_at: Date;
}
