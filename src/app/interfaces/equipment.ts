import { ICollaborator } from "./collaborator";
import { IItem } from "./item";

export interface IEquipment {
  id: string;
  title: string;
  description: string;
  collaborators: ICollaborator[];
  items: IItem[];
  created_at: Date;
}