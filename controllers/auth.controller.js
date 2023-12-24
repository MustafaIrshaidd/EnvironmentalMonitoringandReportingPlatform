import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

const AuthController = {
    // Get a user by ID
    async loginAndGetToken(req, res) {
        try {
            const { username, password } = req.body;
            const user = await prisma.user.findUnique({ where: { username: username } });
            if (!user) {
                return res.status(403).send("Invalid username or password");
            }
            if (user.password !== password) {
                return res.status(403).send("Invalid username or password");
            }
            console.log(process.env.TokenSecretKey)
            const token = jwt.sign(
                { id: user.id, name: user.name, username: user.username },
                process.env.TokenSecretKey,
            );
            res.status(200).send(token);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error");
        }
    }
}
export default AuthController;
