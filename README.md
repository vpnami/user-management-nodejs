# User management API implementation [Node JS] 

Create, Read, Update and Delete (CRUD) operations for organisations, this implementation uses Express framework for API development. User data manipulations for each organisation are in-memory. Basic username validation (if-else) and passport JS (passport-local) authentication methods were used, no password validations were implemented at this time. Local mongoDB is used to store sessions and also used for authentication purposes.

## Project Structure

```js
├── README.md
├── __tests__
│   └── auth.test.js
├── controllers
│   ├── basicAuth.js
│   ├── get_org_users.js
│   └── passportAuth.js
├── data
│   ├── auth_user.json
│   ├── orgs.json
│   └── test.json
├── jest.config.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.js
│   └── users.js
├── server_main.js
└── utils
    ├── connect_db.js
    └── user_schema.js
```

## API Endpoints

List of available routes:

**User Auth Routes**:
- Login (Basic Authentication) - POST /api/login
- Login (Authentication using Passport JS) - POST /api/login/passport

**User Edit Routes**:
- Update users - PUT /api/auradine/orgs/{org_name}/users/{user_id}

**Other User Routes**:
- Get users - GET /api/auradine/orgs/{org_name}/users
- Add users - POST /api/auradine/orgs/{org_name}/users
- Delete users - DELETE /api/auradine/orgs/{org_name}/users/{user_id}

## Notes

* Server: ```127.0.0.1``` 
* Port: ```3033```
* Command used to start the server: ```npm start```
* Test the APIs using postman
  
## Project Enhancements [TODOs]

* User registration API development and persist in a database
* Logout API
* Session expiration for each user
* Password validations, thinking of using hash (considering sensitvity)
* Use of query filters in APIs
* Better logging, use of a single handler rather console.log in each function
