const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    username: {type:String, unique:true},
    email: {type:String, unique:true},
    admin: {type:Boolean, default:false},
    photo: [String],
    bio: String,
    instagram: String,
    password: String,
    following: [mongoose.Schema.Types.ObjectId],
    followers: [mongoose.Schema.Types.ObjectId],
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;