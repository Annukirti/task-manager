import { Task } from "./task";
import { UserOrganization } from "./user-organization";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  userOrganizations: UserOrganization[];
  tasks: Task[];
}
