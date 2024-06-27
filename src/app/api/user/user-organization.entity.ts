import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { UserOrganization } from "../../common/interfaces";
import { OrganizationEntity } from "../organization/organization.entity";

@Entity({ name: "user_organization" })
export class UserOrganizationEntity implements UserOrganization {
  @PrimaryGeneratedColumn()
  id: number;

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
