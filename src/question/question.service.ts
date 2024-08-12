import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { UpdateAnswerDto } from '../answer/dto/update-answer.dto';
import { Server, Socket } from 'socket.io';

@Injectable()
export class QuestionsService {
  constructor(private prismaService: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.prismaService.question.create({
      data: {
        content: createQuestionDto.content,
        maxScore: createQuestionDto.maxScore,
        timer: createQuestionDto.timer,
        answer: {
          create: createQuestionDto.answers.map((answer) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
          })),
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.question.findMany({
      include: { answer: true },
    });
  }

  async findOne(id: number) {
    const question = await this.prismaService.question.findFirst({
      where: { id },
      include: { answer: true },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.prismaService.question.findUnique({
      where: { id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return await this.prismaService.question.update({
      where: { id },
      data: {
        content: updateQuestionDto.content,
        maxScore: updateQuestionDto.maxScore,
        timer: updateQuestionDto.timer,
        answer: {
          upsert:
            updateQuestionDto.answers?.map((answer) => ({
              where: { id: answer.id || 0 },
              update: {
                content: answer.content,
                isCorrect: answer.isCorrect,
              },
              create: {
                content: answer.content,
                isCorrect: answer.isCorrect,
              },
            })) || [],
        },
      },
    });
  }

  async remove(id: number) {
    const question = await this.prismaService.question.delete({
      where: { id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async createAnswer(questionId: number, createAnswerDto: CreateAnswerDto) {
    const question = await this.prismaService.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }
    return this.prismaService.answer.create({
      data: {
        content: createAnswerDto.content,
        isCorrect: createAnswerDto.isCorrect,
        questionId: questionId,
      },
    });
  }

  async updateAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.prismaService.answer.findUnique({
      where: { id },
    });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return this.prismaService.answer.update({
      where: { id },
      data: {
        content: updateAnswerDto.content,
        isCorrect: updateAnswerDto.isCorrect,
      },
    });
  }

  async removeAnswer(id: number) {
    const answer = await this.prismaService.answer.findUnique({
      where: { id },
    });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return this.prismaService.answer.delete({ where: { id } });
  }

  // Fungsi untuk mengacak ID pertanyaan dan mengirim data melalui Socket.IO
  async shuffledQuestionIds(socket: Socket) {
    const questions = await this.prismaService.question.findMany({
      select: { id: true },
    });
    const questionIds = questions.map((question) => question.id);

    // Acak ID pertanyaan
    this.shuffleArray(questionIds);

    // Kirim data ID pertanyaan yang sudah diacak melalui Socket.IO
    socket.emit('questionIdsShuffled', {
      questionIds: questionIds,
    });
  }

  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
