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

// const getOrgUsers = require("./methods/get-org-users");
// const createOrgUser = require("./methods/create-org-user");
//const handler = require('./handler.js');
// const http = require('http')
// const server = http.createServer(handler).listen(PORT, () => console.log(`Server is running ${PORT}`));
//const isValidOrganisation = require("./methods/is-valid-organisation-check");
//const getOrganisations = require("./methods/getOrganisations");
//console.log(org_data["google"]);
//app.get('/auradine/:org_name([a-zA-Z]+)', isValidOrganisation);//
//=> {
    // organisation = isValidOrganisation(req, res);
    // org_users  = {};
    // org_users[organisation] = {};
    // console.log(JSON.stringify(org_users));
    //res.send(JSON.stringify({ message: "App working with Express"}));
//});

// const server = http.createServer((req, res) => {

//     switch (req.url && req.method) {
//         case req.url.match("/auradine/([a-zA-Z])") && "GET":

//     }

//     // Get list of organisations by checking valid organisation or not
//     if (req.url.match("/auradine/([a-zA-Z])") && req.method === "GET") {
//         organisation = isValidOrganisation(req, res);
//         org_users  = {};
//         org_users[organisation] = {};
//         console.log(JSON.stringify(org_users));

//         // After valid organisation check: need to create user, delete, update and read users in the organisations
        
//     } else {
//         res.statusCode = 400;
//         res.setHeader('Content-type', 'application/json');
//         res.write(JSON.stringify({ message: "Invalid URL or Organisation "} ));
//         res.end();
//     }
// });

// server.listen (port, hostname, () => {
//     console.log(`Server Running at http://${hostname}:${port}`)
// });