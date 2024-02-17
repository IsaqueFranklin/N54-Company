const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    photos: [String],
    dia: Date,
    modific: Date,
    index: Number,
})

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;