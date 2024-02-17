const mongoose = require('mongoose');
const {Schema} = mongoose;

const CartaSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    photos: [String],
    dia: Date,
    modific: Date,
    index: Number,
})

const CartaModel = mongoose.model('Carta', CartaSchema);

module.exports = CartaModel;