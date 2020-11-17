import { iUser } from '../@types';

/**
 * Context State TypeScript Interface
 */
export interface iState {
  isAuthenticated: boolean;
  user: iUser | null;
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
