import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  name: String,
  idList: {
    type: Array
  }
});
export default mongoose.model('Fav', Schema);