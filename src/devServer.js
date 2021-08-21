require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

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
            console.log(`Server on port ${PORT}`);
        });
    } catch (e) {
        console.log('Error in server', e);
    }
};

start();
