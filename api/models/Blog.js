const mongoose = require('mongoose');
const {Schema} = mongoose;

const BlogSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    dia: Date,
    modific: Date,
    photos: [String],
    content: String,
})

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;