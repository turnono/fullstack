import express from 'express';

import SentenceController from '../controllers/Sentence';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/get/', SentenceController.readAllSentences);
router.get('/get/:sentenceId', SentenceController.readSentence);
router.post(
  '/create/',
  ValidateJoi(Schemas.sentence.create),
  SentenceController.createSentence
);
router.put(
  '/update/:sentenceId',
  ValidateJoi(Schemas.sentence.update),
  SentenceController.updateSentence
);
router.delete('/delete/:sentenceId', SentenceController.deleteSentence);

export default router;
