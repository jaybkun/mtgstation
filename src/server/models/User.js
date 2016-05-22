import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  image: String,
  decks: [{type: Schema.Types.ObjectId}],
  cards: [{type: Schema.Types.ObjectId}]
});

export default UserSchema;
