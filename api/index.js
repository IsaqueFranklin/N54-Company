const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

//Bcrypt salt and JWT secret

const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'minhavelhanskjndflajsdfnalkjnflksjdfnlçakjsdfa4s55s5s5!@#';

//Middlewares setup

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'hhtp://localhost:5173'
}));

//MongoDb connection

mongoose.connect(process.env.MONGO_URL).then((response) => {
    console.log('Banco de dados conectado.')
}).catch(err => {
    console.log('Erro ao se conectar: ');
    console.log(err);
})



app.listen(4000, () => {
    console.log('Servidor online.')
})