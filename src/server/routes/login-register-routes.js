const express = require("express");
const router = express.Router();
const serverUtils = require("../utilities");
const {User} = require("../database-document-models/user-model");

// Processes user login
router.post("/", (req, res) => {
    User.findOne({userName: req.body.userName}, (err, result) => {
        if(err){
            console.log(`Error in LoginRegistrationOperations.login: ${err}`);
            return;
        }

        if(result && result.validPassword(req.body.password)){

            // Replying to client the 'thisUser' information which includes the user's id in the users collection, and their username
            res.send({
                loginFailed: false,
                thisUser: {
                    name: result.userName,
                    id: result._id
                }
            });
            return;
        }

        // Replaying to client that the login attempt was unsuccesful
        res.send({
            loginFailed: true
        });

    });});

// Processes user registration
router.post("/register", (req, res) => {

    // Outer findOne method checks for the userName
    User.findOne({userName: req.body.userName}, (err, doc) => {
        if(err){
            console.log(`Error in LoginRegistrationOperations.registerUser with userName query: ${err}`);
            return; 
        }

        // If the given username is already registered, deny registration
        if(doc != null){
            res.send({
                registrationFailed: true,
                reason: `The user name '${req.body.userName}' is already in use by another user`
            });
            return;
        }

        // Inner findOne checks for the email
        User.findOne({email: req.body.email}, (err, doc) => {
            if(err){
                console.log(`Error in LoginRegistrationOperations.registerUser with email query: ${err}`);
                return;
            }

            // If the given email is already registered, deny registration
            if(doc != null){
                res.send({
                    registrationFailed: true,
                    reason: `The email '${req.body.email}' is already associated with another account`
                });
                return;
            }
            
            // Creating a new user using the User model and saving into the database
            let newUser = new User({
                userName: req.body.userName,
                email: req.body.email
            });
            
            // Creating and hashing the password
            newUser.password = newUser.generateHash(req.body.password);
            
            newUser.save()
                .then(() => {
                    res.send({registrationFailed: false}); // Basic reply to acknowledge to the client that the registration was succesful (triggers .then in client POST request)
                })
                .catch(error => res.json("Error with registration: ", error));
        });

    });
});

module.exports = router;