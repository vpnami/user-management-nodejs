const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require('passport');

const userRoutes = require("./routes/users.js");
const authRoute = require("./routes/auth.js");

const app = express();
const hostname = '127.0.0.1';
const PORT = 3033;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "AHBVGUYGYUGYFVYTGFVYTVGFUYTGVYUGFUYGYG",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/auth_register',
      }),
}));

app.use((req, res, next) => {
    console.log(`${req.url}:${req.method}`)
    next();
})

console.log('Initializing Passport');
app.use(passport.initialize())
app.use(passport.session());

app.use(authRoute);

app.use((req, res, next) => {
    console.log(req.user);
    if (req.user) next();
    else res.sendStatus(401);
})

app.use('/auradine/orgs', userRoutes);

app.listen(PORT, () => { console.log(`Server Running at http://${hostname}:${PORT}`) });