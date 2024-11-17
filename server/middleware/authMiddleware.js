import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        // Check if the Authorization header is provided
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token Not Valid" });
        }

        // Fetch user from the database based on the decoded token
        const user = await User.findById({ _id: decoded._id }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach user data to request object
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export default verifyUser;
