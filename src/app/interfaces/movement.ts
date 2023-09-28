import { ICollaborator } from "./collaborator";
import { IEquipment } from "./equipment";
import { Item } from "./item";
import { Collaborator } from "./sector";
import { User } from "./user";

export interface Movement {
  id: string;
  date: string;
  item: Item;
  byCollaborator: Collaborator;
  toCollaborator: Collaborator;
  changedBy: {
    name: string;
    email: string;
  };
}

export interface IReport {
  id: string;
  type: MovementTypes;
  createdAt: Date;
  updatedAt: Date;
  equipment: IEquipment;
  collaborator: ICollaborator;
  changeBy: User;
}

export type MovementTypes = "Entrada" | "Saída" | "Transferência";
