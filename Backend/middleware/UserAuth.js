import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const Userauth = async (req, res, next) => {
    console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select('-password');
        if (!user) return res.status(401).json({ error: 'User does not exist' });
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please log in again' });
        }
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export default Userauth;
