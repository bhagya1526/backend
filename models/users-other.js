const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const bookNow = new mongoose.Schema({
    username:{
        type:String,
        require: true,
    },
    phone:{
        type:String,
        require: true,
    },
    clientId:{
        type:String,
        require: true,
    },
    ride:{
        type:Boolean,
        require: true,
        default: false,
    }
});
const Book= new mongoose.model("Book", bookNow);
module.exports = Book;