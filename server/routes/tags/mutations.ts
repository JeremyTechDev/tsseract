import { Thunk, GraphQLFieldConfigMap, GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';

import Tags from './model';
import TagType from './resolvers';
import { iTag } from '../../@types';

const Mutations: Thunk<GraphQLFieldConfigMap<any, any>> = {
    CreateTag: {
        type: TagType,
        description: 'Create a new tag if it does not exist',
        args: { name: { type: GraphQLNonNull(GraphQLString) } },
        resolve: async (_, args) => {
            const tagExists = (await Tags.findOne({ name: args.name })) as iTag;

            // if tag already exists, increment popularity and return
            if (tagExists) {
                tagExists.popularity++;
                await tagExists.save();

                return tagExists;
            }

            const newTag = new Tags({ name: args.name }) as iTag;
            await newTag.save();

            return newTag;
        }
    }
}

export default Mutations;
