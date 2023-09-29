const mongoose = require("mongoose");
mongoose
  .connect('mongodb://localhost:27017/auth_register')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

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