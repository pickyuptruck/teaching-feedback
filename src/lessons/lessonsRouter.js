import { Router } from "express";
import multer from 'multer';
import { lessonsController } from "./lessonsController.js";

export const lessonsRouter = Router();

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


lessonsRouter.get('/', lessonsController.getLessons);
  
lessonsRouter.get('/:id', lessonsController.getLesson);

lessonsRouter.post('/', upload.single('audioFile'), lessonsController.createLesson);

lessonsRouter.delete('/:id', lessonsController.deleteLesson);