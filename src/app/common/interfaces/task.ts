import { Organization } from "./organization";
import { User } from "./user";

export interface Task {
  id?: number;
  title: string;
  description: string;
  organization: Organization;
  assignedTo: User;
  createdAt?: Date;
  updatedAt?: Date;
}
