import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SETTINGS } from 'src/app.utils';
import { UserRegisterRequestDto } from './dto/register-request.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @Post('/register')
  async doUserRegister(
    @Body(SETTINGS.VALIDATION_PIPE) userRegisterPayload: UserRegisterRequestDto,
  ): Promise<User> {
    return await this.userService.doUserRegister(userRegisterPayload);
  }
}
