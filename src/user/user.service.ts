import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        googleId: createUserDto.googleId,
        diamond: createUserDto.diamond,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        userAvatar: {
          include: {
            avatar: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        userAvatar: {
          include: {
            avatar: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.updateMany({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async updateUser (id:number, up)

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
