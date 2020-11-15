/**
 * Context State TypeScript Interface
 */
export interface iState {
  isAuthenticated: boolean;
  user: null | {
    email: string;
    _id: string;
    name: string;
    username: string;
    followers: string[];
    following: string[];
  };
  theme: 'light' | 'dark';
}

/**
 * Initial State
 */
const initialState: iState = {
  isAuthenticated: false,
  user: null,
  theme: 'light',
};

export default initialState;
