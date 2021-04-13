import {
	Thunk,
	GraphQLFieldConfigMap,
	GraphQLNonNull,
	GraphQLString,
	GraphQLObjectType,
	GraphQLList,
} from 'graphql';

import Posts from './model';
import Tags from '../tags/model';
import PostType from './resolvers';
import postValidator from './validator';
import tagValidator from '../tags/validator';
import { iPost, iTag, Context } from '../../@types';

const Mutations: Thunk<GraphQLFieldConfigMap<any, any>> = {
	CreatePost: {
		type: PostType,
		description: 'Create a new post',
		args: {
			title: { type: GraphQLNonNull(GraphQLString) },
			body: { type: GraphQLNonNull(GraphQLString) },
			cover: { type: GraphQLString },
			tags: { type: GraphQLList(GraphQLString) },
		},
		resolve: async (_, args, ctx: Context) => {
			if (ctx.req.cookies.error) throw Error(ctx.req.cookies.errorMessage);

			const { _id: userId } = ctx.req.cookies.profile;
			const { error } = postValidator(
				Object.assign(args, { user: userId.toString() }),
			);
			if (error) throw Error(error.details[0].message);

			let createdTags: iTag[] = [];
			if (ctx.req.body.tags && ctx.req.body.tags.length) {
				const tagsError = tagValidator(ctx.req.body.tags);

				if (tagsError) throw Error('Invalid tag or tags');

				createdTags = <iTag[]>await Promise.all(
					ctx.req.body.tags.map(async (tagName: string) => {
						const tagExists = (await Tags.findOne({ name: tagName })) as iTag;

						// if tag already exists, increment popularity and return
						if (tagExists) {
							tagExists.popularity++;
							await tagExists.save();

							return { ...tagExists._doc, new: false };
						}

						const newTag = new Tags({ name: tagName }) as iTag;
						await newTag.save();

						return { ...newTag._doc, new: true };
					}),
				);

				if (!createdTags.some((tag) => tag)) {
					throw Error('An error ocurred while creating the tags');
				}
			}

			const post = new Posts({ ...args, tags: createdTags }) as iPost;
			await post.save();

			return post;
		},
	},
	ToggleLike: {
		type: PostType,
		description: 'Toggles the like for a for of the authenticated user',
		args: { postId: { type: GraphQLNonNull(GraphQLString) } },
		resolve: async (_, args, ctx: Context) => {
			if (ctx.req.cookies.error) throw Error(ctx.req.cookies.errorMessage);

			const { postId } = args;
			const { _id: userId } = ctx.req.cookies.profile;

			const post = (await Posts.findByIdAndUpdate(postId, {
				$inc: { interactions: 1 },
			})) as iPost;

			if (!post) throw Error('No post found with the given id.');

			const likes = post.likes.map((user) => user.toString());

			const update = likes.includes(userId) ? '$pull' : '$push';
			const newPost = await Posts.findByIdAndUpdate(
				post._id,
				{ [update]: { likes: userId } },
				{ new: true },
			);

			return newPost;
		},
	},
	DeletePost: {
		type: PostType,
		description: 'Delete a post from the authenticated user',
		args: { postId: { type: GraphQLNonNull(GraphQLString) } },
		resolve: async (_, args, ctx: Context) => {
			if (ctx.req.cookies.error) throw Error(ctx.req.cookies.errorMessage);

			const { postId } = args;
			const post = (await Posts.findOneAndDelete({
				_id: postId,
				user: ctx.req.cookies.profile.id,
			})) as iPost;

			if (!post) throw Error('No posts found with the given id');

			return post;
		},
	},
};

export default Mutations;
