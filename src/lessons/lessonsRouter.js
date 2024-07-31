import { Router } from "express";
import { lessonsController } from "./lessonsController.js";
import upload from "../config/multerConfig.js";

export const lessonsRouter = Router();

lessonsRouter.get('/', lessonsController.getLessons);
  
lessonsRouter.get('/:id', lessonsController.getLesson);

lessonsRouter.post('/', upload.single('audioFile'), lessonsController.createLesson);

lessonsRouter.delete('/:id', lessonsController.deleteLesson);