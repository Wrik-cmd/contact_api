import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // accept either "Authorization: Bearer <token>" or a custom "Auth" header
        const header = req.header("Authorization") || req.header("Auth");
        const token = header?.startsWith("Bearer ") ? header.slice(7) : header;

        if (!token) {
            return res.status(401).json({ message: "Login first", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found", success: false });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token", success: false });
    }
};
