import { Schema, model } from 'mongoose';

export const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 45,
        unique: true,
    },
    popularity: {
        type: Number,
        default: 1,
        min: 0,
    },
});

const Tag = model('Tags', tagSchema, 'tags');

export default Tag;
