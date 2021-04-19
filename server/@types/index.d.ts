import { Types, Document } from 'mongoose';
import { Request, Response } from 'express';

export interface iAuthenticatedUser {
	id: any;
	email: string;
	name: string;
	username: string;
}

export interface iComment extends Document {
	user: Types.ObjectId;
	body: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface iPost extends Document {
	user: Types.ObjectId;
	title: string;
	body: string;
	cover: string;
	comments: [];
	likes: Types.ObjectId[];
	interactions: Number;
	tags: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

export interface iTag extends Document {
	name: string;
	popularity: number;
	_doc: Document;
}

export interface iUser extends Document {
	name: string;
	avatar: string;
	username: string;
	password: string;
	email: string;
	birthDate: Date;
	createdAt: Date;
	updatedAt: Date;
	followers: Types.ObjectId[];
	following: Types.ObjectId[];
}

export interface Context {
	req: Request;
	res: Response;
}
