/**
 * Context State TypeScript Interface
 */
export interface iState {
  isAuthenticated: boolean;
  user:
    | {}
    | {
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
  user: {},
  theme: 'light',
};

export default initialState;
