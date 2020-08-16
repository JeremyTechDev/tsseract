import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const { User } = require('../models/user');
const { JWT_KEY } = require('../config/env');

describe('generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = { id: mongoose.Types.ObjectId().toHexString() };
    const user = new User(payload);
    const token = user.generateAuthToken(payload.id);
    const decoded = jwt.verify(token, JWT_KEY);

    expect(decoded).toMatchObject(payload);
  });
});
