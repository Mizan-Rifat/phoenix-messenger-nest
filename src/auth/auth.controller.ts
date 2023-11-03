import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/sign-in')
  signIn(email: string, pass: string) {
    return this.authService.signIn(email, pass);
  }

  // @Get('/profile')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
}
