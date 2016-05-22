import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  title: String,
  description: String,
  cards: [{type: Schema.Types.ObjectId}],
  tags: [String]
});

export default DeckSchema;
