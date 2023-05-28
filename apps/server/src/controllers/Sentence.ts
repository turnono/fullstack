import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Sentence from '../models/Sentence';

const createSentence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const text = req.body.text;

  const sentence = new Sentence({
    _id: new mongoose.Types.ObjectId(),
    text,
  });

  return sentence
    .save()
    .then((result) => {
      res.status(201).json({
        sentence: result,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

const deleteSentence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sentenceId = req.params.sentenceId;

  Sentence.findByIdAndDelete(sentenceId)
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

const readAllSentences = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  Sentence.find()
    .then((sentences) => {
      res.status(200).json({
        sentences,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );

export default {
  createSentence,
  deleteSentence,
  readAllSentences,
};
