require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.DEV_CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.log(`Err, could not connect to the database ${err}`);
            } else {
                console.log('Connected to the database.');
            }
        })
        app.listen(PORT, () => {
            console.log('mode:', process.env.NODE_ENV === 'production' ? 'production' : 'development');
            console.log(`Server on port ${PORT}`);
        });
    } catch (e) {
        console.log('Error in server', e);
    }
};

start();
