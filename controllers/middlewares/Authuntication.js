import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

 const authMiddleWare =  {

   async Validate(req, res, next)  {
    try {
      const { TokenSecretKey } = process.env;
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Invalid or missing authorization header' });
      }

      const token = authorization.split('Bearer ')[1];
      if (!token) {
        return res.status(400).json({ message: 'Invalid token' });
      }
         const decoded = jwt.verify(token,TokenSecretKey);
         console.log("decodedis",decoded)
      if (!decoded || !decoded.id || !decoded.username) {
        return res.status(400).json({ message: 'Invalid authorization token payload' });
      }

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach the user object to the request for later use in routes
      req.user = user;

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ message: 'Internal server error during authentication' });
    }
  }
}
export default authMiddleWare;
