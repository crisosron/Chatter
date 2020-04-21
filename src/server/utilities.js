const bcrypt = require("bcrypt");

module.exports = {
    generateHash: password => {
        return bcrypt.hashSync(password, 8)
    }
}
