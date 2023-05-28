import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Word from '../models/Word';

const createWord = async (req: Request, res: Response, next: NextFunction) => {
  const type = req.body.type;
  const word = req.body.word;

  const newWord = new Word({
    _id: new mongoose.Types.ObjectId(),
    type,
    word,
  });

  return newWord
    .save()
    .then((result) =>
      res.status(201).json({
        sentence: result,
      })
    )
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

const updateWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const deleteWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const readWord = async (req: Request, res: Response, next: NextFunction) => {};
const readAllWords = async (req: Request, res: Response, next: NextFunction) =>
  Word.find()
    .then((words) =>
      res.status(200).json({
        words,
      })
    )
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );

export default {
  createWord,
  updateWord,
  deleteWord,
  readWord,
  readAllWords,
};
