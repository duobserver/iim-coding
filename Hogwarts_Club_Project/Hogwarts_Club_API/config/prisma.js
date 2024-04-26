// initialize prisma ORM connection
const { PrismaClient } = require("@prisma/client");

module.exports = new PrismaClient();