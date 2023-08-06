import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/register-request.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async doUserRegister(
    userRegisterPayload: UserRegisterRequestDto,
  ): Promise<User> {
    const user = new User();

    user.name = userRegisterPayload.name;
    user.email = userRegisterPayload.email;
    user.password = userRegisterPayload.password;
    user.userRole = 'member';

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await User.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await User.findOne({
      where: {
        id,
      },
    });
  }
}
