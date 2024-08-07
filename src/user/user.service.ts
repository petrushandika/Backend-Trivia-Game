import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
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

  async findUserLogged(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id },
        select: {
          userAvatar: {
            select: {
              avatar: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          diamond: true,
          email: true,
          username: true,
          userAvatar: {
            select: {
              avatar: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
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

  async updateUser(userId: number, username: string, avatarId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const avatar = await this.prismaService.avatar.findUnique({
        where: { id: avatarId },
      });

      if (!avatar) {
        throw new BadRequestException('Avatar not found');
      }

      const userAvatar = await this.prismaService.userAvatar.findFirst({
        where: {
          userId,
          avatarId,
        },
      });

      if (userAvatar) {
        console.log(userAvatar);
      } else {
        await this.prismaService.userAvatar.create({
          data: {
            userId,
            avatarId,
          },
        });
      }

      return await this.prismaService.user.update({
        where: { id: userId },
        data: {
          username: username,
        },
        include: {
          userAvatar: {
            include: {
              avatar: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createUserAvatar(userId: number, avatarId: number) {
    try {
      return await this.prismaService.userAvatar.create({
        data: {
          userId,
          avatarId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async buyAvatar(userId: number, avatarId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const avatar = await this.prismaService.avatar.findUnique({
        where: { id: avatarId },
      });
      if (!avatar) {
        throw new NotFoundException('Avatar not found');
      }

      if (avatar.diamond !== null && user.diamond < avatar.diamond) {
        throw new BadRequestException('Not enough diamonds');
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          diamond:
            avatar.diamond !== null ? { decrement: avatar.diamond } : undefined,
          userAvatar: {
            create: {
              avatarId: avatar.id,
            },
          },
        },
        include: {
          userAvatar: {
            include: {
              avatar: true,
            },
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
