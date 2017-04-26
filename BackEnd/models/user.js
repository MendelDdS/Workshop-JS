var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    },

    CPF: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    adress: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    Coach: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);