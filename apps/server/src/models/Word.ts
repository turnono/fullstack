import mongoose, { Document, Schema } from 'mongoose';

export interface IWord extends Document {
  type: string;
  word: string;
}

export interface IWordModel extends IWord, Document {}

const WordSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    word: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model('Word', WordSchema);
