import bluebird from 'bluebird';
import mongoose from 'mongoose';
bluebird.promisifyAll(mongoose);
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: {type: String, required: true},
  id: {type: String, required: true, unique: true},
  url: {type: String, required: true},
  colors: [String],
  types: [String],
  subtypes: [String],
  supertypes: [String],
  editions: [{type: String, required: true}]
});

const CardModel = mongoose.model('Card', CardSchema);

export default CardModel;
