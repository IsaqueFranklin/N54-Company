const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
    origin: 'http://localhost:5173'
}));

app.post('/confirmar-email', (req, res) => {
    const {name, username, email, password, codes} = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "isaquefrankli@gmail.com",
          pass: process.env.GMAIL_API_KEY,
        },
      });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: 'N54 Club', // sender address
        to: email, // list of receivers
        subject: 'Confirme sua conta na N54 Club', // Subject line
        text: 'Falta apenas um passo para você fazer parte da N54 Club. Esse é o seu código: '+codes, // plain text body
        html: '', // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }

    main().catch(console.error);
    
    res.json(codes);
})

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