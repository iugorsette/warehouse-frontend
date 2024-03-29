import { ICollaborator } from "./collaborator";
import { IItem } from "./item";

export interface IEquipment {
  id: string;
  register: string;
  title: string;
  description: string;
  collaborators: ICollaborator[];
  items: IItem[];
  createdAt: Date;
  updatedAt: Date;
}