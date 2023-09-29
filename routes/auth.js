const { Router } = require('express');
const passport = require('passport');
const { Strategy } = require('passport-local');
const mongoose = require("mongoose");
const router = Router();

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

const Users = mongoose.model('sessions', UserSchema);

console.log("Users");
console.log(auth_users);

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
  });

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User');
    try {
        const user = await Users.findById(id);
        if (!user) throw new Error("User not found");
        console.log(user);
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
  });

passport.use(
    new Strategy (
        async function verify (username, password, done) {
            try {
                const user = await Users.findOne({ username });
                console.log(user);
                if (!user) {
                    console.log("Invalid Authentication");
                    done(null, null);
                } else {
                    console.log("Authenticated Successfully");
                    done(null, user);
                }
            } catch(err) {
                console.log(err);
                done(err, null);
            }
    }
)
);

// Basic Authentication with no validation against a database
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if ( username && password ) {
        if ( req.session.user ) {
            res.send(req.session.user)
        }
        else {
            req.session.user = {
                username,
            };
            res.send(req.session)
        }
    } else {
        res.sendStatus(401);
    };
});

// Authentication using passport JS
router.post('/login/passport', passport.authenticate('local'), (req, res) => {
    console.log('Logged In');
    res.sendStatus(200);
});

module.exports = router;