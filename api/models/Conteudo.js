const mongoose = require('mongoose');
const {Schema} = mongoose;

const ConteudoSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    content: String,
    photos: [String],
    video: String, //Link do vídeo do youtube para embed
    dia: Date,
    modific: Date,
    coments: [String],
    likes: [String],
    index: Number,
    conjunto: {type: mongoose.Schema.Types.ObjectId, ref:'Modulo'},
})

const ConteudoModel = mongoose.model('Conteudo', ConteudoSchema);

module.exports = ConteudoModel;