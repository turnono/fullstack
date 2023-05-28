import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Sentence from '../models/Sentence';
// import axios from 'axios';
//
// const changeStream = Sentence.watch();
//
// changeStream.on('change', (change) => {
//   console.log('Change event:', change);
//   //  now you can send all the changes to the client app
//
//   axios
//     .get('http://localhost:9090/sentences/get')
//     .then((response) => {
//       console.log('getAll endpoint called:', response.data);
//       // Handle the response or perform additional actions
//     })
//     .catch((error) => {
//       console.error('Error calling getAll endpoint:', error);
//       // Handle the error appropriately
//     });
// });
//
// changeStream.on('error', (err) => {
//   console.error('Change stream error:', err);
// });

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
const updateSentence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const deleteSentence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const readSentence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
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
  updateSentence,
  deleteSentence,
  readSentence,
  readAllSentences,
};
