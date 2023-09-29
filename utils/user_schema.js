const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    password: {
      type: mongoose.SchemaTypes.BigInt,
      required: true,
    }
});

module.exports = mongoose.model('sessions', UserSchema);