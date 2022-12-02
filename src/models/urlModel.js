const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    urlCode:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required: true,
        minLength:5
    },
    longUrl:{
        type: String,
        trim: true,
        required: true
    },
    shortUrl:{
        type:String,
        unique:true,
        required:true
    }
});

module.exports = mongoose.model('Url',urlSchema,'url')