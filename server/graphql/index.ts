import { GraphQLSchema } from 'graphql';

import RootQueryType from './query';
import RootMutationType from './mutation';

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

export default schema;
