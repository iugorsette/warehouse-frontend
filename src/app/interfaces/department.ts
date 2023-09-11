import { ICollaborator } from "./collaborator";

export interface IDepartment {
  _id: string;
  name: string;
  colaborattors?: ICollaborator[];
  created_at: Date;
  updated_at: Date;
}
