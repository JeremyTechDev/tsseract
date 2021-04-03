import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import { Thunk, GraphQLFieldConfigMap, GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';

import Users from './model';
import UserType from './resolvers';
import userValidator from './validator';
import cookieCreator from '../../helpers/cookieCreator';
import { iUser } from '../../@types';

const Mutations: Thunk<GraphQLFieldConfigMap<any, any>> = ({
    CreateUser: {
        type: UserType,
        description: 'Create a new user',
        args: {
            avatar: { type: GraphQLString },
            birthDate: { type: GraphQLNonNull(GraphQLString) },
            email: { type: GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLNonNull(GraphQLString) },
            password: { type: GraphQLNonNull(GraphQLString) },
            username: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_, args, ctx) => {
            const { error } = userValidator(args);
            if (error) throw Error(error.details[0].message);

            const isUsernameTaken = await Users.findOne({ username: args.username });
            const isEmailTaken = await Users.findOne({ email: args.email });

            if (isUsernameTaken) throw Error('Username already taken')
            if (isEmailTaken) throw Error('Email already taken')

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);

            Object.assign(args, { password: hashedPassword });

            const user = new Users({ ...args }) as iUser;
            await user.save();

            const userToken = {
                _id: user._id,
                email: user.email,
                name: user.name,
                username: user.username,
            };

            const { cookie, cookieConfig } = cookieCreator(userToken);
            ctx.res.cookie('tsseract-auth-token', cookie, cookieConfig);

            return user;
        }
    },
    UpdateUser: {
        type: UserType,
        description: "Updates fields of the authenticated user",
        resolve: async (_, __, ctx) => {
            if (ctx.req.cookie.error) throw Error(ctx.req.cookie.message)

            const { _id: userId } = ctx.req.cookies.profile;

            const schema = Joi.object({
                avatar: Joi.string().trim(),
                name: Joi.string().trim().min(3).max(255),
                email: Joi.string()
                    .email({ tlds: { allow: false } })
                    .min(2)
                    .max(255)
                    .trim(),
            });

            const { error } = schema.validate(ctx.req.body);
            if (error) throw Error(error.details[0].message);

            const user = (await Users.findByIdAndUpdate(
                userId,
                { ...ctx.req.body },
                { new: true },
            )) as iUser;

            return user;
        }
    },
    ToggleFollow: {
        type: new GraphQLObjectType({
            name: 'ToggleFollow',
            description: "The follwing and follower's data",
            fields: () => ({ following: { type: UserType }, follower: { type: UserType } })
        }),
        description: 'Toggles the follow state of a user',
        resolve: async (_, __, ctx) => {
            if (ctx.req.cookie.error) throw Error(ctx.req.cookie.message)

            const { followToUsername } = ctx.req.params;
            const followBy: iUser = ctx.req.cookies.profile;

            const followTo = (await Users.findOne({
                username: followToUsername,
            })) as iUser;

            if (!followTo) throw Error('No user found with the given username');

            if (followTo._id.equals(followBy._id))
                throw Error('You cannot follow your own account');

            // If the auth user already follows the account, unfollow
            let newFollowBy: iUser, newFollowTo: iUser, action: 'follow' | 'unfollow';
            if (followBy.following.includes(followTo._id)) {
                // Remove the followTo user from the followBy following list
                newFollowBy = (await Users.findOneAndUpdate(
                    { _id: followBy._id },
                    // @ts-ignore
                    { $pull: { following: followTo._id } },
                    { new: true },
                )) as iUser;

                // Remove the follower (followBy) from the followTo user
                newFollowTo = (await Users.findOneAndUpdate(
                    { _id: followTo._id },
                    // @ts-ignore
                    { $pull: { followers: followBy._id } },
                    { new: true },
                )) as iUser;

                action = 'unfollow';
            } else {
                // Add the new following (followTo) to followBy user
                newFollowBy = (await Users.findOneAndUpdate(
                    { _id: followBy._id },
                    { $push: { following: followTo._id } },
                    { new: true },
                )) as iUser;

                // Add the new follower (followBy) to the followTo user
                newFollowTo = (await Users.findOneAndUpdate(
                    { _id: followTo._id },
                    { $push: { followers: followBy._id } },
                    { new: true },
                )) as iUser;

                action = 'follow';
            }

            return ({ following: newFollowBy, follower: newFollowTo, action });
        }
    },
    DeleteUser: {
        type: UserType,
        description: 'Removes the authenticated user from the database',
        resolve: async (_, __, ctx) => {
            if (ctx.req.cookie.error) throw Error(ctx.req.cookie.message)

            const { _id: userId } = ctx.req.cookies.profile;
            const user = await Users.findByIdAndDelete(userId);

            return user;
        }
    }
})

export default Mutations
