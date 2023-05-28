import express from 'express';

import SentenceController from '../controllers/Sentence';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/get/', SentenceController.readAllSentences);
router.post(
  '/create/',
  ValidateJoi(Schemas.sentence.create),
  SentenceController.createSentence
);
router.delete('/delete/:sentenceId', SentenceController.deleteSentence);

export default router;
