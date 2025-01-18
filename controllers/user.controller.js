import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';


// Create user controller
export const createUserController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const user = await userService.createUser(req.body.email, req.body.password);
        const token = await user.generateJWT();

        return res.status(201).json({ user, token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// login user controller..
export const loginUserController = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: "Invalid Email" });
        }

        const isMatch = await user.isPasswordValid(password);
        if (!isMatch) {
            return res.status(401).json(
                { error: "Invalid Password" }
            )
        }

        //if email and password are correct then genrate token..
        const token = await user.generateJWT();

        return res.status(200).json({ user, token })

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}