const {User} = require("../database-document-models/user-model");
class ServerOperationsUtilities{

    static printUser(id){
        User.findById(id, (err, res) => {
            if(err){
                console.log("Error in ServerOperationsUtilities.printUser: ", err);
                return;
            }
            console.log(res);
        });
    }
}

module.exports = ServerOperationsUtilities;