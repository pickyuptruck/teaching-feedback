import express from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient()

app.use(express.json());

const port=8000;

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

app.post('/lessons', async (req, res) => {
  const { title } = req.body
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


