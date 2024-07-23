import { Schema } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:
        true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

export default taskSchema;