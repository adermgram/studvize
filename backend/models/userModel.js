import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        tasks: [
            {
                name: { type: String, required: true },
                dueDate: { type: Date, required: true },
                priority: { type: String, required: true },
                category: { type: String, required: true },
                description: { type: String },
                completed: { type: Boolean, default: false },
            },
        ],
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('User',userSchema);
export {User};