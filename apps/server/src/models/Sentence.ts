import mongoose, { Document, Schema } from 'mongoose';

export interface ISentence extends Document {
  text: string;
}

export interface ISentenceModel extends ISentence, Document {}

const SentenceSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model('Sentence', SentenceSchema);
