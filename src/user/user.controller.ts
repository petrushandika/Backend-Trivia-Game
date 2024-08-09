import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('buy-avatar')
  async buyAvatar(@Body() body :{avatarId: number}, @Res() res: Response) {
    try {
      const {avatarId} = body
      console.log('avatarId', avatarId)
      const user = res.locals.user;
      console.log(user)
      const updatedUser = await this.userService.buyAvatar(user.id, +avatarId);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error buy avatar:', error);
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  @Post('update-user/:id')
  async updateUser(
    @Body() body: { username: string },
    @Res() res: Response,
    @Param('id') avatarId: number,
  ) {
    try {
      const user = res.locals.user;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const updatedUser = await this.userService.updateUser(
        user.id,
        body.username,
        +avatarId,
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  @Post('user-avatar/:id')
  async createUserAvatar(@Res() res: Response, @Param('id') avatarId: number) {
    try {
      const user = res.locals.user;
      const userAvatar = await this.userService.createUserAvatar(
        user.id,
        +avatarId,
      );
      return res.status(200).json(userAvatar);
    } catch (error) {
      throw error;
    }
  }

  @Get('getUser')
  async getUser(@Res() res: Response) {
    try {
      const user = res.locals.user;
      const getUser = await this.userService.findOne(user.id);
      return res.status(200).json(getUser);
    } catch (error) {
      throw error;
    }
  }

  @Get('check')
  check(@Res() res: Response) {
    const user = res.locals.user;
    return res.json(user);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
