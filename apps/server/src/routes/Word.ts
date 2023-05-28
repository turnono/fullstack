import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import WordController from '../controllers/Word';

const router = express.Router();

router.get('/get/', WordController.readAllWords);
router.post(
  '/create/',
  ValidateJoi(Schemas.word.create),
  WordController.createWord
);

export default router;
