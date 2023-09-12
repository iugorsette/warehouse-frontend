import { Collaborator } from "./sector";

export interface IEquipment {
  id: string;
  title: string;
  description: string;
  collaborator: Collaborator;
  attributes: { [key: string]: string | number }[];
  created_at: Date;
}
