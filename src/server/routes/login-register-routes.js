const express = require("express");
const router = express.Router();
const {User} = require("../database-document-models/user-model");
const REGISTER_EVENTS = require("../../events/register-events");
const LOGIN_EVENTS = require("../../events/login-events");
const io = require("../socket");

// Processes user login
router.post("/", (req, res) => {
    User.findOne({userName: req.body.userName, password: req.body.password}, (err, result) => {
        if(err){
            console.log(`Error in LoginRegistrationOperations.login: ${err}`);
            return;
        }

        if(result){
            io.to(req.body.clientSocketID).emit(LOGIN_EVENTS.LOGIN_SUCCESFUL);

            // Replying to client the 'thisUser' information which includes the user's id in the users collection, and their username
            res.send({thisUser: {
                name: result.userName,
                id: result._id
            }});

            return;
        }

        io.to(req.body.clientSocketID).emit(LOGIN_EVENTS.LOGIN_DENIED);
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
            io.to(req.body.clientSocketID).emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
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
                io.to(req.body.clientSocketID).emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                    reason: `The email '${req.body.email}' is already associated with another account`
                }); 
                return;
            }
            
            // Creating a new user using the User model and saving into the database
            let newUser = new User({
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email
            });
            
            newUser.save()
                .then(() => {
                    io.to(req.body.clientSocketID).emit(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL);
                    res.send(); // Basic reply to acknowledge to the client that the registration was succesful (triggers .then in client POST request)
                })
                .catch(error => res.status(400).json("Error with registration: ", error));
        });

    });
});

module.exports = router;