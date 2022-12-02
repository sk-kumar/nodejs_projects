const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser())


app.use('/',route);



mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDb is connected'))
    .catch(err => console.error(err))


app.listen(process.env.PORT ,()=>{
    console.log(`Server running on port: ${process.env.PORT}`)
});
