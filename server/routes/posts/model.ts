import { Schema, Types, model } from 'mongoose';

import { commentsSchema } from '../comments/model';

export const postsSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    title: {
        type: String,
        min: 5,
        max: 145,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
    },
    interactions: {
        type: Number,
        default: 0,
        min: 0,
    },
    likes: [
        {
            type: Types.ObjectId,
            ref: 'Users',
            default: [],
        },
    ],
    comments: {
        type: [commentsSchema],
        default: [],
    },
    tags: [
        {
            type: Types.ObjectId,
            ref: 'Tags',
            default: [],
        },
    ],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

const Posts = model('Posts', postsSchema, 'posts');

export default Posts;
