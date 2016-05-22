import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: String,
  block: String,
  color: String,
  type: String,
  power: String,
  defense: String,
  subType: String,
  tags: [String],
  castingCost: []
});

export default CardSchema;
