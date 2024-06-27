import { Organization } from "./organization";
import { User } from "./user";

export interface UserOrganization {
  id: number;
  user: User;
  userId: number;
  organization: Organization;
  organizationId: number;
}
