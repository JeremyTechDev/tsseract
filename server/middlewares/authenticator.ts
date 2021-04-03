import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import Users from '../routes/users/model';
import { iAuthenticatedUser, iUser } from '../@types';

const codes = [
    'Access denied. No credentials provided.',
    'Access denied. Corrupt credentials.',
    'Access denied. Non-existent user.',
    'Access denied. The current user is not allowed to perform this action.',
];


/**
 * Authenticate and ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
const authenticator: RequestHandler = async (req, res, next) => {
    try {
        const token = req.signedCookies['tsseract-auth-token'] || req.query.token;

        if (!token) {
            req.cookies.profile = {
                error: true,
                message: codes[0],
                statusCode: 401,
            }
            next();
        }

        const decodedUser = <iAuthenticatedUser>jwt.verify(token, <string>process.env.JWT_KEY);

        if (!decodedUser) {
            req.cookies.profile = {
                error: true,
                message: codes[1],
                statusCode: 403,
            }
            next();
        }

        const { _id: userId } = decodedUser;
        const user = (await Users.findById(userId)) as iUser;

        if (!user) {
            req.cookies.profile = {
                error: true,
                message: codes[2],
                statusCode: 404,
            }
            next()
        }

        if (!user._id.equals(userId)) {
            req.cookies.profile = {
                error: true,
                message: codes[3],
                statusCode: 403,
            }
            next()
        }

        req.cookies.profile = user;
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

export default authenticator;
