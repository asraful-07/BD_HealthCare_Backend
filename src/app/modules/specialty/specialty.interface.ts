export interface ICreateSpecialtyPayload {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}
