import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import fs from 'fs';

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

class OpenAIService {
    constructor() {
        this.openai = new OpenAI(process.env.OPENAI_API_KEY);
    }

    getTranscription = async (audioFile) => {
        return await this.openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFile.path),
            model: "whisper-1",
        });
    }

    getFeedback = async (transcription) => {
        return await this.openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "Summarise this text."},
                {"role": "user", "content": transcription}
            ],
            model: "gpt-4o-mini",
        });
        
}
}

export const lessonsService = new LessonsService();
export const openAIService = new OpenAIService();