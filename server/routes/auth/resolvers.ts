import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const AuthType: GraphQLObjectType = new GraphQLObjectType({
	name: 'AuthType',
	description: 'Authentication Token Data',
	fields: () => ({
		_id: { type: GraphQLNonNull(GraphQLString) },
		avatar: { type: GraphQLNonNull(GraphQLString) },
		email: { type: GraphQLNonNull(GraphQLString) },
		name: { type: GraphQLNonNull(GraphQLString) },
		username: { type: GraphQLNonNull(GraphQLString) },
	}),
});

export default AuthType;
