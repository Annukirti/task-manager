import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Create User",
  name: "CreateUserDto",
})
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "username",
    required: true,
    example: "abc@12",
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "email",
    required: true,
    example: "abc@mail.com",
  })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiModelProperty({
    description: "password",
    required: true,
    example: "abc@133",
  })
  password: string;
}

@ApiModel({
  description: "Login User",
  name: "LoginUserDto",
})
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "email",
    required: true,
    example: "abc@mail.com",
  })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiModelProperty({
    description: "password",
    required: true,
    example: "abc@133",
  })
  password: string;
}

@ApiModel({
  description: "Update User",
  name: "UpdateUserDto",
})
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "username",
    required: false,
    example: "abc@12",
  })
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiModelProperty({
    description: "email",
    required: false,
    example: "abc@mail.com",
  })
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  @ApiModelProperty({
    description: "password",
    required: false,
    example: "abc@133",
  })
  password?: string;
}

@ApiModel({
  description: "Forgot Password",
  name: "ForgotPasswordDto",
})
export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "email",
    required: true,
    example: "abc@mail.com",
  })
  email: string;
}

@ApiModel({
  description: "Reset Password",
  name: "ResetPasswordDto",
})
export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiModelProperty({
    description: "token",
    required: true,
  })
  token?: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiModelProperty({
    description: "newPassword",
    required: true,
    example: "abc@133",
  })
  newPassword: string;
}
