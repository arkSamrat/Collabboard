import jwt from 'jsonwebtoken';
import userData from '../database/user.data.js';

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, 'ArpanKheer');
    const user = await userData.findOne({ email: decoded.email });

    if (user?.role !== 'admin') {
      return res.status(403).json({ message: 'Admins only' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export default isAdmin;
