import { AppDataSource } from "../../database/datasource";
import { OrganizationEntity } from "../organization/organization.entity";
import { UserEntity } from "../user/user.entity";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";
import { TaskEntity } from "./task.entity";

class TaskService {
  constructor(
    private taskRepository = AppDataSource.getRepository(TaskEntity)
  ) {}

  async createTask(
    taskDto: CreateTaskDto,
    assignedTo: UserEntity,
    organization: OrganizationEntity
  ) {
    return await this.taskRepository.save({
      ...taskDto,
      assignedTo,
      organization,
    });
  }

  async getTasks(user: UserEntity, organization: OrganizationEntity) {
    return await this.taskRepository.find({
      where: { assignedTo: user, organization },
    });
  }

  async getTaskById(id: number) {
    return await this.taskRepository.findBy({ id });
  }

  async updateTaskById(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({ id }, updateTaskDto);
  }

  async deleteTaskById(id: number) {
    return await this.taskRepository.delete({ id });
  }
}

export const taskService = new TaskService();
