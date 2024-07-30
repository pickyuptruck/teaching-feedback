import express from 'express';
import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai';
import multer from 'multer';
import fs from 'fs';

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

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

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFile.path),
    model: "whisper-1",
  });
  
  const lesson = await prisma.lesson.create({
    data: { title , transcription: transcription.text },
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


