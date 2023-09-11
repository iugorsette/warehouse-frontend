import { IDepartment } from "./department";
import { IEquipment } from "./equipment";

export interface ICollaborator {
  _id?: string;
  name: string;
  role: string;
  department: IDepartment ;
  items?: IEquipment[];
  created_at?: Date;
  updated_at?: Date;
}
