import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private user: Model<User>,
    private usersService: UsersService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.user(createUserDto);
    return user.save();
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
