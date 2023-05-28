import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { ISentence } from '../models/Sentence';
import { IWord } from '../models/Word';

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  sentence: {
    create: Joi.object<ISentence>({
      text: Joi.string().required(),
    }),
    update: Joi.object<ISentence>({
      text: Joi.string().required(),
    }),
  },
  word: {
    create: Joi.object<IWord>({
      type: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      word: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<IWord>({
      type: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      word: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
