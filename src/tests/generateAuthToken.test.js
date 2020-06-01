const { User } = require('../server/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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
