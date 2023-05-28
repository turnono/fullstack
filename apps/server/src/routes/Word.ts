import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import WordController from '../controllers/Word';

const router = express.Router();

router.get('/get/', WordController.readAllWords);
router.get('/get/:wordId', WordController.readWord);
router.post(
  '/create/',
  ValidateJoi(Schemas.word.create),
  WordController.createWord
);
router.put(
  '/update/:wordId',
  ValidateJoi(Schemas.word.update),
  WordController.updateWord
);
router.delete('/delete/:wordId', WordController.deleteWord);

export default router;
