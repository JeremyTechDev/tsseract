import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import Users from '../routes/users/model';
import { iAuthenticatedUser, iUser } from '../@types';

/**
 * Authenticate and ensures that the user performing the action coincides with the credentials
 * @param req Express request object
 * @param res Express response object
 * @param next Next middleware function
 */
const authenticator: RequestHandler = async (req, _, next) => {
	const proceedWithAuthError = (errorMessage: string) => {
		req.cookies = {
			error: true,
			errorMessage,
		};
	};

	try {
		const token: string =
			req.signedCookies['tsseract-auth-token'] || req.query.token || null;

		if (!token) proceedWithAuthError('Access denied. No credentials provided.');

		const decodedUser = <iAuthenticatedUser>(
			jwt.verify(token, <string>process.env.JWT_KEY)
		);
		if (!decodedUser)
			proceedWithAuthError('Access denied. Corrupt credentials.');

		const { id: userId } = decodedUser;
		const user = (await Users.findById(userId)) as iUser;
		if (!user) proceedWithAuthError('Access denied. Non-existent user.');

		if (!user._id.equals(userId)) {
			proceedWithAuthError(
				'Access denied. The current user is not allowed to perform this action.',
			);
		}

		req.cookies.profile = user;
	} catch (error) {
		proceedWithAuthError(error.message);
	} finally {
		next();
	}
};

export default authenticator;
