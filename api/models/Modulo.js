const mongoose = require('mongoose');
const {Schema} = mongoose;

const ModuloSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    photos: [String],
    dia: Date,
    modific: Date,
    index: Number,
    conjunto: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
})

const ModuloModel = mongoose.model('Modulo', ModuloSchema);

module.exports = ModuloModel;