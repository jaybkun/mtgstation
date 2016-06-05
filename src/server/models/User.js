import bluebird from 'bluebird';
import mongoose from 'mongoose';
bluebird.promisifyAll(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  image: String
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
