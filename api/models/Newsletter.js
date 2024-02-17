const mongoose = require('mongoose');
const {Schema} = mongoose;

const NewsletterSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    content: String,
    photos: [String],
    dia: Date,
    modific: Date,
    likes: [String],
    enviado: {type:Boolean, default:false},
    EnviadoPara: [String],
    index: Number,
    conjunto: {type: mongoose.Schema.Types.ObjectId, ref:'Carta'},
})

const NewsletterModel = mongoose.model('Newsletter', NewsletterSchema);

module.exports = NewsletterModel;