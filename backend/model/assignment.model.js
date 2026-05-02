import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    review: {// This assignment is for which review
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    reviewer: {// Employee who is giving the review
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewee: { // Employee who is being reviewed
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'submitted'],
        default: 'pending'
    }
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;