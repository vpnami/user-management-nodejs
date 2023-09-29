function basicAuthentication (request, response) {
    const { username, password } = request.body;
    if ( username && password ) {
        response.status(200);
        // If user property set which means already authenticated else
        // Will attach the user property to the session object 
        if ( !request.session.user ) {
            request.session.user = {
                username,
            };
        }
        response.send(request.session);
    
    } else {
        response.sendStatus(401, "Provide Username & Password");
    };
};

module.exports = { basicAuthentication };