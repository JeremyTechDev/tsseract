import { GraphQLObjectType } from 'graphql';

import UserMutations from '../routes/users/mutations';

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        ...UserMutations
    })
});

export default RootMutationType;
