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
}

/**
 * Initial State
 */
const initialState: iState = {
  isAuthenticated: false,
  user: {},
};

export default initialState;
