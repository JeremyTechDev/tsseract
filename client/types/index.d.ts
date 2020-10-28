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
