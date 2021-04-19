import { Schema, Types, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 255,
        minlength: 1,
        required: true,
        trim: true,
    },
    avatar: {
        default: '',
        trim: true,
        type: String,
    },
    username: {
        lowercase: true,
        maxlength: 50,
        minlength: 2,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    password: {
        type: String,
        maxlength: 255,
        minlength: 8,
        required: true,
    },
    email: {
        lowercase: true,
        maxlength: 255,
        minlength: 2,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    following: {
        type: [{ type: Types.ObjectId, ref: 'Users' }],
        default: [],
    },
    followers: {
        type: [{ type: Types.ObjectId, ref: 'Users' }],
        default: [],
    },
});

const Users = model('Users', userSchema);

export default Users;
