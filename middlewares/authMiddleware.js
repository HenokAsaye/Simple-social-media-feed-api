import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  

  if (!token) return res.status(401).json({ message: 'Access Token Required' });
  jwt.verify(token, process.env.JWT_KEY, async (err, decodedUser) => {
    if (err) {
        console.log("JWT verification error:", err);
        return res.status(403).json({ message: 'Invalid Token' });
    }

    req.user = await User.findById(decodedUser._id);


    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    next();
});



};

