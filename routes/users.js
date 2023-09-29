const { Router } = require('express');
const router = Router();

const { v4: uuidv4 } = require("uuid");

const org_data = require("../data/orgs.json");
const organisations = org_data.map(json => json.org_name);
let org_users = [];

console.log(organisations);
//console.log(org_data);
/* 
Get list of organisations to show case the customer has 
***** This requires authentication ******
*/
// *** APIs needed *** //
/*Get list of users per organisation*/
router.get('/:org_name([a-zA-Z]+)/users', (req, res) => {
    var req_organisation = req.params.org_name;
    if (organisations.includes(req_organisation)) {
        res.send(org_users.filter(org_users => org_users.org_name === req_organisation)) 
    }
    else {
        res.status(404).send("Org not found")
    }
});

/*Create User*/
router.post('/:org_name([a-zA-Z]+)/users', (req, res) => {
    var req_organisation = req.params.org_name;
    const newUser = {};
    if (organisations.includes(req_organisation)) {
        const newUserId = uuidv4();
        newUser["user_id"] = newUserId;
        newUser["org_name"] = req_organisation;
        for ( let each_key in req.body ) {
            newUser[each_key] = req.body[each_key];
        }
        org_users.push(newUser);
        console.log(org_users)
        res.send("User added");
    }
    else {
        res.status(404).send("Org not found, to add a user")
    }
});

/*Update User*/
router.put('/:org_name([a-zA-Z]+)/users/:user_id', (req, res) => {
    var req_organisation = req.params.org_name;
    if (organisations.includes(req_organisation)) {
        updateUser = req.body
        const found = org_users.some(user => user.user_id === req.params.user_id);
        if (found) {
            org_users.forEach(user => {
                if (user.user_id === req.params.user_id) {
                    user.FirstName = updateUser.FirstName ? updateUser.FirstName : user.FirstName;
                    user.LastName = updateUser.LastName ? updateUser.LastName : user.LastName;
                    user.DOB = updateUser.DOB ? updateUser.DOB : user.DOB;
                    user.City = updateUser.City ? updateUser.City : user.City;
                    user.State = updateUser.State ? updateUser.State : user.State;

                }
            })
            res.status(200).send(`User Updated ${req.params.user_id}`)

        }
        else {
            res.status(404).send("Updated Failed: User ID not found")
        }
        
    }
    else {
        res.status(404).send("Org not found, to update a user")
    }
});

/*Delete User*/
router.delete('/:org_name([a-zA-Z]+)/users/:user_id', (req, res) => {
    var req_organisation = req.params.org_name;
    if (organisations.includes(req_organisation)) {
        const found = org_users.some(user => user.user_id === req.params.user_id);
        if (found) {
            org_users = org_users.filter(user => user.user_id !== req.params.user_id)
            res.status(200).send(`Deleted User ID:  ${req.params.user_id}`)
        }
        else {
            res.status(404).send("Failed: User ID not found")
        }
        
    }
    else {
        res.status(404).send("Org not found to delete the user")
    }
});

// /*For unknown route*/
router.get('*', (req,res) => {
    res.status(404).send("Page not found")
});

module.exports = router;