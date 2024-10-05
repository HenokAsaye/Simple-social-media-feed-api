import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  

  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid Token' });

      // Fetch the user from the database
      req.user = await User.findById(user._id);
      
      // Check if user was found
      if (!req.user) {
          return res.status(404).json({ message: 'User not found' });
      }

      console.log("Authenticated user:", req.user);
      next();
  });
};

