// Hogwarts Club API user funtions

import prisma from "../config/prisma.js"; // connect to database through prisma

import bCrypt from "../tools/bcrypt.js"; // import encryption module

const bcrypt = new bCrypt(); // create encryption class

// declare API functions
class UserController {
    // REMEMBER to declare async functions for response delays and use try/catch for failsafe
    // REMEMBER req = request and res = response
    // WARNING always hash passwords before saving them in the database ALWAYS

    async index(req, res) {
        // display all user (login not required)
        try {
            // fetch all users from database
            const users = await prisma.user.findMany();

            // 200: request succeeded
            return res.status(200).json(users);
        } catch (e) {
            // if the command fails
            // 500: internal server error
            return res.status(500).json({ message: e.message }); // 500: internal error
        }
    }

    async create(req, res) {
        // create new user (login not required)
        try {
            // get new user credentials from body
            const body = req.body;

            if (body.name == "") {
                return res.status(422).json({ message: "Please insert a name" });
            }

            if (body.email == "") {
                return res.status(422).json({ message: "Please insert an email address" });
            }

            // check if email is already used
            const email = await prisma.user.findUnique({
                where: { email: body.email },
            });

            // if email is already used
            // terminate user creation

            // 409: conflict
            if (email) {
                return res.status(409).json({ message: "Email already used" });
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
                    ...body,
                    password: hashedPassword,
                },
            });

            // 201: created successfully
            return res.status(201).json({ message: "User created successfully" });
        } catch (e) {
            // if command fails
            // 500: internal server error
            return res.status(500).json({ message: e.message });
        }
    }

    async read(req, res) {
        // display specific user informations (login not required)
        try {
            // get user id from url
            const id = req.params.id;

            // look for existing user
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });

            // if user does not exist
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            //if user does exist

            // 302: found
            return res.status(302).json(user);
        } catch (e) {
            // if command fails

            // 500: internal server error
            return res.status(500).json({ message: e.message });
        }
    }

    async update(req, res) {
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

    async delete(req, res) {
        // delete specific user (login required)
        try {
            const body = req.body;
            console.log(body);

            if (body.confirm !== "DELETE") {
                return res.status(409).json({ message: "Wrong confirmation word" });
            }

            // get user id from url
            const id = req.user.id;

            // check if user exists
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });

            // if user does not exist
            if (!user) {
                // 404: not found
                return res.status(404).json({ message: "User not found" });
            }

            // if user does exist
            // delete user
            const deleteUser = await prisma.user.delete({
                where: {
                    id: Number(id),
                },
            });

            // 204: no content/deleted
            return res.status(204).json({ message: "User deletion succeeded" });
        } catch (e) {
            // if command fails
            // 500: internal server error
            return res.status(500).json({ message: e.message });
        }
    }
}

// module.exports = new UserController();
export default UserController;
