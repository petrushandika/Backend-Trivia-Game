import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { UpdateAnswerDto } from '../answer/dto/update-answer.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.prisma.question.create({
      data: {
        content: createQuestionDto.content,
        maxScore: createQuestionDto.maxScore,
        timer: createQuestionDto.timer,
        answer: {
          create: createQuestionDto.answers.map(answer => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
          })),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.question.findMany({
      include: { answer: true },
    });
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: { answer: true },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.prisma.question.findUnique({ where: { id } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return await this.prisma.question.update({
      where: { id },
      data: {
        content: updateQuestionDto.content,
        maxScore: updateQuestionDto.maxScore,
        timer: updateQuestionDto.timer,
        answer: {
          upsert: updateQuestionDto.answers?.map(answer => ({
            where: { id: answer.id || 0 }, // Use id if available, otherwise default to 0
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
    const question = await this.prisma.question.delete({
      where: { id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async createAnswer(questionId: number, createAnswerDto: CreateAnswerDto) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }
    return this.prisma.answer.create({
      data: {
        content: createAnswerDto.content,
        isCorrect: createAnswerDto.isCorrect,
        questionId: questionId,
      },
    });
  }

  async updateAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.findUnique({ where: { id } });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return this.prisma.answer.update({
      where: { id },
      data: {
        content: updateAnswerDto.content,
        isCorrect: updateAnswerDto.isCorrect,
      },
    });
  }

  async removeAnswer(id: number) {
    const answer = await this.prisma.answer.findUnique({ where: { id } });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return this.prisma.answer.delete({ where: { id } });
  }
}
