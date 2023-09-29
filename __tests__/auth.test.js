const { basicAuthentication } = require('../controllers/basicAuth');
const passportVerify = require('../controllers/passportAuth');
const user = require('../utils/user_schema');

jest.mock('../utils/user_schema');

const request = {
    body: {
        "username": 1234
    }
}

const request1 = {
    body: {
        username: "Tom",
        password: 1234
    },
    session: {
    }
}

const response = {
    send: jest.fn((x) => x),
    status: jest.fn((x) => x),
    sendStatus: jest.fn((x) => x)
}

const username = "Username";
const password = 12345;

const done = jest.fn((x) => x);

it ('unauthorization 401 for basic authentication where username & password not provided', () => {
    basicAuthentication(request, response);
    expect(response.sendStatus).toHaveBeenCalledWith(401, "Provide Username & Password");
    expect(response.send).toHaveBeenCalledTimes(0);
});

it ('Authorized 201 & send back session with username object assigned', () => {
    basicAuthentication(request1, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
});

it('Passport Auth test: Authentication Successful, user found!', async () => {
    const mockedUser = {
        username: username,
        password: password
    }
    await user.findOne.mockImplementationOnce(() => (mockedUser));
    passportVerify(username, password, done);
    expect(user.findOne).toHaveBeenCalledWith({ username });
    expect(done(null, mockedUser));
});

it('Passport Auth test: Invalid Authentication, User not found!', async () => {
    const mockedUser = {
        username: username,
        password: password
    }
    await user.findOne.mockImplementationOnce(() => undefined);
    passportVerify(username, password, done);
    expect(user.findOne).toHaveReturnedWith(undefined);
    expect(done(null, null));
});