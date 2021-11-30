require('dotenv').config();

import express from 'express';
import routes from './routes';
import path from 'path';
import session from 'express-session';
import SecMongo from 'connect-mongo';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.strConection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('rdy') })
    .catch(err => { console.log(err) });


const sessionConfig = session({
    secret: process.env.sessionSecret,
    store: SecMongo.create({ mongoUrl: process.env.strConection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: true
    }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionConfig);

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('rdy', () => {
    app.listen(3030, () => {
        console.log('ONLINE! rodando na porta 3030');
        console.log('http://localhost:3030');
    })
})