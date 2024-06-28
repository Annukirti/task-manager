import { Task } from "./task";
import { UserOrganization } from "./user-organization";

export interface Organization {
  id?: number;
  name: string;
  userOrganizations: UserOrganization[];
  tasks: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}
