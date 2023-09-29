import { IEquipment } from "./equipment";

export interface IItem {
  id: string;
  property: string;
  value: string | number;
  description: string;
  equipment:IEquipment | null;
  equipmentId: string;
  created_at: Date;
  updated_at: Date;
}