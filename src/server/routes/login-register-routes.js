const express = require("express");
const router = express.Router();
const {User} = require("../database-document-models/user-model");
const REGISTER_EVENTS = require("../../events/register-events");
const io = require("../socket");

// Processes user registration
router.get("/", (req, res) => {
    // TODO: Handle login
});

router.post("/register", (req, res) => {
    console.log("in router.post for registration");
    User.findOne({userName: req.body.userName}, (err, doc) => {
        if(err){
            console.log(`Error in LoginRegistrationOperations.registerUser with userName query: ${err}`);
            return; 
        }

        // If the given username is already registered, deny registration
        if(doc != null){
            console.log("Username is already in use: Need to send notification to client: ", req.body.clientSocketID);
            io.to(req.body.clientSocketID).emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                reason: `The user name ${req.body.userName} is already in use by another user`
            });
            return;
        }

        User.findOne({email: req.body.email}, (err, doc) => {
            if(err){
                console.log(`Error in LoginRegistrationOperations.registerUser with email query: ${err}`);
                return;
            }

            // If the given email is already registered, deny registration
            if(doc != null){
                console.log("Email is already in use");
                io.to(req.body.clientSocketID).emit(REGISTER_EVENTS.REGISTRATION_DENIED, {
                    reason: `The email ${req.body.email} is already associated with another account`
                }); 
                return;
            }

            let newUser = new User({
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email
            });
            
            newUser.save()
                .then(() => {/*TODO: send notification to client of succesful registration*/res.json("New user created")})
                .catch(error => res.status(400).json("Error with registration: ", error));
            
        });

    });
});

module.exports = router;