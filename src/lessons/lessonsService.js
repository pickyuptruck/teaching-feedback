import { PrismaClient } from '@prisma/client';

class LessonsService {

  constructor() {
    this.prisma = new PrismaClient();
  }
  getLessons = async () => await this.prisma.lesson.findMany();

  getLesson = async (id) => await this.prisma.lesson.findUnique({ where: { id } });

  addLesson = async (lesson) => await this.prisma.lesson.create({ data: lesson });

  updateLesson = async (id, lesson) => await this.prisma.lesson.update({ where: { id }, data: lesson });

  deleteLesson = async (id) => await this.prisma.lesson.delete({ where: { id } });

}

export const lessonsService = new LessonsService();
