import { IDepartment } from "./department";
import { IEquipment } from "./equipment";

export interface ICollaborator {
  id?: string;
  name: string;
  role: string;
  department: IDepartment ;
  created_at?: Date;
  updated_at?: Date;
  equipments?: IEquipment[];

}