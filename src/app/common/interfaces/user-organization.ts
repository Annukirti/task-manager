import { Role } from "../enums";
import { Organization } from "./organization";
import { User } from "./user";

export interface UserOrganization {
  id?: number;
  role: Role;
  user: User;
  userId: number;
  organization: Organization;
  organizationId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
