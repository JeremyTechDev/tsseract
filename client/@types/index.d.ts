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

export interface iPost {
  _id: string;
  body: string;
  comments: string[];
  cover: string;
  createdAt: string;
  likes: string[];
  tags: iTag[];
  title: string;
  updatedAt: string;
  user: { name: string; _id: string; username: string };
}

export interface iTag {
  _id: string;
  name: string;
  popularity: number;
}
