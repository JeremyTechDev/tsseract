import bcrypt from 'bcrypt';
import {
	Thunk,
	GraphQLFieldConfigMap,
	GraphQLNonNull,
	GraphQLString,
} from 'graphql';

import AuthType from './resolvers';
import Users from '../users/model';
import authValidator from './validator';
import cookieCreator from '../../helpers/cookieCreator';
import { iUser, Context } from '../../@types';

const Mutations: Thunk<GraphQLFieldConfigMap<any, any>> = {
	Authenticate: {
		type: AuthType,
		args: {
			username: { type: GraphQLNonNull(GraphQLString) },
			password: { type: GraphQLNonNull(GraphQLString) },
		},
		description: 'Logs in a user and sets the authentication token',
		resolve: async (_, args, ctx: Context) => {
			const { error } = authValidator(args);
			if (error) throw Error(error.details[0].message);

			const { username, password } = args;

			const user = (await Users.findOne({ username })) as iUser;
			if (!user) throw Error('Invalid username or password');

			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) throw Error('Invalid username or password');

			const userToken = {
				id: user._id,
				email: user.email,
				name: user.name,
				username: user.username,
				avatar: user.avatar,
			};

			const { cookie, cookieConfig } = cookieCreator(userToken);
			ctx.res.cookie('tsseract-auth-token', cookie, cookieConfig);

			return userToken;
		},
	},
	Deauthenticate: {
		type: AuthType,
		description: 'Removes the autheticated user auth token',
		resolve: (_, __, ctx: Context) => {
			if (ctx.req.cookies.error) throw Error(ctx.req.cookies.errorMessage);
			const { name, username, email, id, avatar } = ctx.req.cookies.profile;

			ctx.res.clearCookie('tsseract-auth-token');
			return { name, username, email, id, avatar };
		},
	},
};

export default Mutations;
