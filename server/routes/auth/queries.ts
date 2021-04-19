import {
	Thunk,
	GraphQLFieldConfigMap,
	GraphQLNonNull,
	GraphQLString,
	GraphQLObjectType,
} from 'graphql';

import { Context } from '../../@types';

const Queries: Thunk<GraphQLFieldConfigMap<any, any>> = {
	GetAuthToken: {
		type: new GraphQLObjectType({
			name: 'AuthToken',
			description: 'Authentication Token Data',
			fields: () => ({
				_id: { type: GraphQLNonNull(GraphQLString) },
				avatar: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLNonNull(GraphQLString) },
				username: { type: GraphQLNonNull(GraphQLString) },
			}),
		}),
		description: 'Returns the token data of the authenticated user',
		resolve: (_, __, ctx: Context) => {
			if (ctx.req.cookies.error) throw Error(ctx.req.cookies.errorMessage);
			const { _id, email, name, username, avatar } = ctx.req.cookies.profile;

			return { name, username, email, _id, avatar };
		},
	},
};

export default Queries;
