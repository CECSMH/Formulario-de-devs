import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    devSide: { type: String, required: true },
    seniority: { type: String, required: true },
    stacks: { type: Array, required: true },
    experience: { type: String, required: true },
    password: { type: String, required: true }
});

const Model = mongoose.model('user', Schema);

export default Model;