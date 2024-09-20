import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  

  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });

    req.user = await User.findById(user._id); 
    next();
  });
};

export default authenticateToken;
