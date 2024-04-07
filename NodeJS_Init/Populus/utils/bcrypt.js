// Password encrypt system
// REMEMBER to call the dedicated module
const bcrypt = require("bcrypt");

const saltRounds = 10;

class bCrypt {
    async hashPassword(password) {
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password, hash) {
        // console.log("Comparing", password, hash);
        return await bcrypt.compare(password, hash);
    }
}

// const hashPassword = (password) => {
//   return bcrypt.hash(password, saltRounds);
// };

// const comparePassword = (password, hash) => {
//   return bcrypt.compare(password, hash);
// };

// module.exports = {
//   hashPassword,
//   comparePassword,
// };

module.exports = new bCrypt();
