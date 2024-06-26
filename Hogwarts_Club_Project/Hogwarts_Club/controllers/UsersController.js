// Hogwarts Club API user functions

import prisma from "../config/prisma.js"; // connect to database through prisma

import bCrypt from "../tools/bcrypt.js"; // import encryption module

const bcrypt = new bCrypt(); // create encryption class

// declare API functions

// REMEMBER to declare async functions for response delays and use try/catch for failsafe
// REMEMBER req = request and res = response
// WARNING always hash passwords before saving them in the database ALWAYS

// display all user (login not required)
export async function index(req, res) {
    try {
        // fetch all users from database
        const users = await prisma.profile.findMany();

        // 200: request succeeded
        return res.status(200).json(users);
    } catch (e) {
        // if the command fails
        return res.status(500).json({ message: e.message }); // 500: internal error
    }
}

// search user by name
export async function searchUser(req, res) {
    try {
        const name = req.params.name;
        // console.log(typeof name);

        const users = await prisma.profile.findMany({
            where: {
                pseudo: {
                    contains: name,
                },
            },
        });

        // console.log(users);

        res.status(200).json(users);
    } catch (error) {
        // if the command fails
        return res.status(500).json({ message: error.message }); // 500: internal error
    }
}

export async function create(req, res) {
    // create new user (login not required)
    try {
        const body = req.body; // get new user credentials from body

        if (body.email == "") {
            return res.status(422).json({ message: "Please insert an email address" });
        }

        // check if email is already used
        const email = await prisma.user.findUnique({
            where: { email: body.email },
        });

        // if email is already used
        // terminate user creation
        if (email) {
            return res.status(409).json({ message: "Email already used by another account" }); // 409: conflict
        }

        // if email is not already used
        // check if password does not exist or is shorter than 8 characters
        if (body.password == "" || body.password.length < 8) {
            return res.status(422).json({ message: "User password must be at least 8 characters long" });
        }

        // hash new password
        const hashedPassword = await bcrypt.hashPassword(body.password);

        // add new user to database
        const user = await prisma.user.create({
            data: {
                // expand all properties of body into data (as separate properties)
                email: body.email,
                password: hashedPassword,
                profile: {
                    create: {
                        ...body.profile,
                        age: Number(body.profile.age),
                    },
                },
                settings: {
                    create: {},
                },
            },
        });

        return res.status(201).json({ message: "User created successfully" }); // 201: created successfully
    } catch (e) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: e.message });
    }
}

export async function read(req, res) {
    // display specific user informations (login not required)
    try {
        // get user id from url
        const id = req.params.id;

        // look for existing user
        const user = await prisma.user.findUnique({ where: { id: Number(id) }, select: { profile: true } });

        if (!user) {
            // if user does not exist
            return res.status(404).json({ message: "User not found" });
        }

        //if user exists
        return res.status(302).json(user.profile); // 302: found
    } catch (error) {
        // if command fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

export async function readInternal(userId) {
    // check if user exists
    // this function is intended for internal use only
    try {
        // look for existing user
        const user = await prisma.user.findUnique({ where: { id: userId } });

        // console.log(user);

        if (user) {
            // if user is found
            return true;
        } else {
            // if user is not found
            return false;
        }
    } catch (error) {
        // if function fails
        throw new Error(error);
    }
}

export async function update(req, res) {
    // update specific user informations (login required)
    try {
        // get new user informations
        const body = req.body;

        // check if confirmation password in settings form is same as user password
        const isSamePassword = await bCrypt.comparePassword(body.currentPassword, req.user.password);

        // if password is not valid
        if (!isSamePassword) return res.status(401).json({ message: "Invalid password" });

        // if user name does not exist or is same as before
        if (body.name == "" || body.name == req.user.name) {
            // keep current name
            delete body.name;
        }

        // if email does not exist
        if (body.email == "") {
            // keep current email
            delete body.email;
        }

        // if email has changed check if email is already used
        if (body.email !== req.user.email) {
            const email = await prisma.user.findUnique({
                where: { email: body.email },
            });

            // if email is already used
            // 409: conflict
            if (email) {
                return res.status(409).json({ message: "Email already used" });
            }
        }

        // if password does not exist
        if (body.password == "") {
            // keep current email
            delete body.password;
        } else if (body.password.length < 8) {
            return res.status(422).json({ message: "User password must be at least 8 characters long" });
        }

        // get user id
        const id = req.user.id;

        // look for existing user
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        // if user does not exist
        if (!user) {
            // 404: not found
            return res.status(404).json({ message: "User not found" });
        }

        // if user exists
        // hash the new password
        if (body.password) {
            body.password = await bCrypt.hashPassword(body.password);
        }

        // save new user informations
        // REMEMBER if body already contains a value (like password) it will be overwritten
        delete body.currentPassword;
        const updateUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                ...body,
                // password: hashedPassword,
            },
        });

        // 200: ok
        return res.status(200).json({ message: "User informations have been saved successfully" });
    } catch (e) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: e.message });
    }
}

export async function terminate(req, res) {
    // delete specific user (login required)
    try {
        // const body = req.body;
        // console.log(body);

        // if (body.confirm !== "DELETE") {
        //     return res.status(409).json({ message: "Wrong confirmation word" });
        // }

        // get user id from url
        const userId = Number(req.user.id);

        // delete user
        const deleteUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        // delete trade offers related to current
        const deleteTrades = await prisma.trade.deleteMany({ where: { OR: [{ authorId: userId }, { targetId: userId }] } });

        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// module.exports = new UserController();
// export default UserController;
