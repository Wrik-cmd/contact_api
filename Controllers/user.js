import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log("Printing the body=", req.body);
    if (!name  || !email  || !password )
        return res.json({ message: "All fields are required" });
    // Check the existing user
    let user = await User.findOne({ email })

    if (user) return res.json({ message: "User already exist", success: false });

    // Hash password
    const hassPassword = await bcrypt.hash(password, 10);

    // create user
    user = await User.create({ name, email, password: hassPassword });

    res.json({ message: 'User created sucessfully', success: true, user });

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    // Check the empty fields
    if (!email || !password) {
        return res.json({ message: "All fields are required",success:false });

    }
        
    

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "User doesn't exist", success: false });

    // Compare password
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) return res.status(400).json({ message: "Invalid password", success: false });

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });


    res.json({ message: `Welcome ${user.name}`,token, success: true });


    
};