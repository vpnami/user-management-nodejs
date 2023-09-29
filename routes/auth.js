const { Router } = require('express');
const passport = require('passport');
const { Strategy } = require('passport-local');
const router = Router();

const { basicAuthentication } = require('../controllers/basicAuth');
const passportVerifyAuthentication = require('../controllers/passportAuth');
const Users = require('../utils/user_schema');

passport.serializeUser((user, done) => {
    console.log("Serializing User..");
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
    new Strategy ( passportVerifyAuthentication )
);

// Basic Authentication with no validation against a database
router.post('/login', basicAuthentication);

// Authentication using passport JS
router.post('/login/passport', passport.authenticate('local'), (req, res) => {
    console.log('Logged In');
    res.sendStatus(200);
});

module.exports = router;