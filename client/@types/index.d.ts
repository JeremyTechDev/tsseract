export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export interface iBackgroundImageData {
  color?: string;
  description?: string;
  img: string;
  link?: string;
  name?: string;
  raw?: string;
}

export interface iSignUpUser {
  birthDate: string;
  email: string;
  name: string;
  password: string;
  rPassword: string;
  username: string;
}

export interface iSignInUser {
  password: string;
  username: string;
}

export interface iUserToken {
  _id: string;
  email: string;
  name: string;
  username: string;
}

export interface iUser {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  username: string;
  followers: object;
  following: object;
  error?: string;
}

export interface iPost {
  _id: string;
  body: string;
  comments: iComment[];
  cover: string;
  createdAt: string;
  likes: string[];
  interactions: number;
  tags: iTag[];
  title: string;
  updatedAt: string;
  user: iUser;
}

export interface iComment {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user: iUser;
}

export interface iTag {
  _id: string;
  name: string;
  popularity: number;
}

export type authType = {
  user: iUser | null;
  from?: string;
  error?: string;
};
