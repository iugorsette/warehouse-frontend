export interface IItem {
  id: string;
  property: string;
  value: string | number;
  description: string;
  equipmentId: string;
  created_at: Date;
  updated_at: Date;
}