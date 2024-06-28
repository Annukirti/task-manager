import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Task } from "../../common/interfaces";
import { OrganizationEntity } from "../organization/organization.entity";
import { UserEntity } from "../user/user.entity";
import { CoreEntity } from "../core.entity";

@Entity({ name: "task" })
export class TaskEntity extends CoreEntity implements Task {
  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  @Column({ name: "description", type: "varchar", nullable: true })
  description: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.tasks)
  @JoinColumn({ name: "organization_id" })
  organization: OrganizationEntity;

  @Column({ name: "organization_id", type: "bigint", nullable: true })
  organizationId?: number;

  @Column({ name: "assigned_to_id", type: "bigint", nullable: true })
  assignedToId?: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: "assigned_to_id" })
  assignedTo: UserEntity;
}
