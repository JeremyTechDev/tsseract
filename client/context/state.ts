/**
 * Context State TypeScript Interface
 */
export interface iState {
  isAuthenticated: boolean;
  authToken: string | null;
  user: {
    email: string;
    id: string;
    name: string;
    username: string;
  } | null;
}

/**
 * Initial State
 */
const initialState: iState = {
  isAuthenticated: false,
  authToken: null,
  user: null,
};

export default initialState;
