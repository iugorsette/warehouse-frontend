import { ICollaborator } from "./collaborator";
import { IEquipment } from "./equipment";
import { User } from "./user";
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

export type Vinculate = { collaboratorId: string; equipmentId: string };