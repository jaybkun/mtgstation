const bluebird = require('bluebird');
const mongoose = require('mongoose');
bluebird.promisifyAll(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  image: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
