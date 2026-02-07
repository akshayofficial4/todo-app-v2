import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './auth.model.js';
import { env } from '../../config/env.js';

// register user

export const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return user;
};

// login user..

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if(!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Invalid credentials");
    }
    // analytics..

    const today = new Date().toDateString();
    const lastLoginDay = user.lastLoginAt
    ? new Date(user.lastLoginAt).toDateString()
    : null;

    if(today !== lastLoginDay) {
        user.totalLoginDays +=1;
    };

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        env.jwtSecret,
        {expiresIn: "1d" }
    );
     return { token, user };
 };

