import mongoose from "mongoose";
import { User } from "../auth/auth.model.js";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        order: {
           type: Number,
           default: 0,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    
    { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);