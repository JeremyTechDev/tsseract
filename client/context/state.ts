/**
 * Context State TypeScript Interface
 */
export interface iState {
  isAuthenticated: boolean;
  authToken: string;
}

/**
 * Initial State
 */
const initialState: iState = {
  isAuthenticated: false,
  authToken: '',
};

export default initialState;
