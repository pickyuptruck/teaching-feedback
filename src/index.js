import express from 'express';
import {lessonsRouter}  from './lessons/lessonsRouter.js';

const app = express();

app.use(express.json());
app.use('/lessons', lessonsRouter);

const port=8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});