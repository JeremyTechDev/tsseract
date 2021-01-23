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
const initialState = (user: iUser | null = null): iState => ({
  isAuthenticated: Boolean(user),
  user,
  theme: 'dark',
});

export default initialState;
