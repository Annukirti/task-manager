import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Task } from "../../common/interfaces";
import { OrganizationEntity } from "../organization/organization.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ name: "task" })
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.tasks)
  organization: OrganizationEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  assigned_to: UserEntity;
}
