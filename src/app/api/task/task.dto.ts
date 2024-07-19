import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Create Task",
  name: "CreateTaskDto",
})
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "title",
    required: true,
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "description",
    required: false,
  })
  description?: string;
}

@ApiModel({
  description: "Update Task",
  name: "UpdateTaskDto",
})
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "title",
    required: false,
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "description",
    required: false,
  })
  description?: string;
}
