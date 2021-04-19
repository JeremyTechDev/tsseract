import { GraphQLObjectType } from 'graphql';

import AuthMutations from '../routes/auth/mutations';
import PostMutations from '../routes/posts/mutations';
import TagMutations from '../routes/tags/mutations';
import UserMutations from '../routes/users/mutations';

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        ...AuthMutations,
        ...PostMutations,
        ...TagMutations,
        ...UserMutations,
    })
});

export default RootMutationType;
