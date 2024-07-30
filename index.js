import express from 'express';
import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai';
import multer from 'multer';

const upload = multer({ dest: "uploads/" });

const app = express();
const prisma = new PrismaClient()

app.use(express.json());

const port=8000;

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.get('/lessons', async (req, res) => {
  const lessons = await prisma.lesson.findMany()
  res.json(lessons)
});

app.get('/lessons/:id', async (req, res) => {
  const { id } = req.params
  const lesson = await prisma.lesson.findUnique({
    where: { id },
  })
  res.json(lesson)
});

app.post('/lessons', upload.single('audioFile'), async (req, res) => {
  const { title } = req.body

  const audioFile = req.file

  console.log(audioFile)
  
  
  const lesson = await prisma.lesson.create({
    data: { title },
  })
  res.json(lesson)
});

app.delete('/lessons/:id', async (req, res) => {
  const { id } = req.params
  await prisma.lesson.delete({
    where: { id },
  })
  res.json({ message: "success" });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


