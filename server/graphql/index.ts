import { GraphQLSchema } from 'graphql';

import RootQueryType from './query';

const schema = new GraphQLSchema({
  query: RootQueryType,
});

export default schema;
