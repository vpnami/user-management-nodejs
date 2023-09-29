const Users = require('../utils/user_schema');

async function passportVerify (username, password, done) {
    try {
        const user = await Users.findOne({ username });
        console.log(user);
        if (!user) {
            console.log("Invalid Authentication");
            return done(null, null);
        } else {
            console.log("Authenticated Successfully");
            return done(null, user);
        }
    } catch(err) {
        console.log(err);
        return done(err, null);
    }
}

module.exports = passportVerify;