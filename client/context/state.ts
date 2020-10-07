/**
 * Context State TypeScript Interface
 */
export interface iState {
  isAuthenticated: boolean;
  authToken: { id: string | null };
}

/**
 * Initial State
 */
const initialState: iState = {
  isAuthenticated: false,
  authToken: { id: null },
};

export default initialState;
