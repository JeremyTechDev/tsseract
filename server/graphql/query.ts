import { GraphQLObjectType } from 'graphql';

import AuthQueries from '../routes/auth/queries';
import PostQueries from '../routes/posts/queries';
import TagQueries from '../routes/tags/queries';
import UserQueries from '../routes/users/queries';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        ...AuthQueries,
        ...PostQueries,
        ...TagQueries,
        ...UserQueries,
    }),
});

export default RootQueryType;
