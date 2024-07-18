import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserOrganization } from "../../common/interfaces";
import { OrganizationEntity } from "../organization/organization.entity";
import { CoreEntity } from "../core.entity";
import { Role } from "../../common";

@Entity({ name: "user_organization" })
export class UserOrganizationEntity
  extends CoreEntity
  implements UserOrganization
{
  @Column({ name: "role", enum: Role, default: Role.GENERAL })
  role: Role;

  @ManyToOne(() => UserEntity, (user) => user.userOrganizations)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ name: "user_id", type: "bigint" })
  userId: number;

  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.userOrganizations
  )
  @JoinColumn({ name: "organization_id" })
  organization: OrganizationEntity;

  @Column({ name: "organization_id", type: "bigint" })
  organizationId: number;
}
