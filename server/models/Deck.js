const bluebird = require('bluebird');
const mongoose = require('mongoose');
bluebird.promisifyAll(mongoose);
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  name: {type:String, required: true},
  description: String,
  owner: Schema.Types.ObjectId,
  cards: [Schema.Types.ObjectId],
  tags: [String]
});

const DeckModel = mongoose.model('Deck', DeckSchema);

module.exports = DeckModel;
