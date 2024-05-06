// Password encryption tool

import bcrypt from "bcrypt"; // import bcrypt

const saltRounds = 10;

class bCrypt {
    async hashPassword(password) {
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

export default bCrypt;
