import Types from './types';
import { iState } from './state';
import { iUser } from '../@types';

/**
 * Main Context Reducer
 * @param state current state of the app
 * @param action action to perform
 * @param action.type type of action to perform
 * @param action.payload new data to store
 */
const reducer = (state: iState, action: iAction) => {
  switch (action.type) {
    case Types.SET_CREDENTIALS:
      state.isAuthenticated = Boolean(action.payload);
      state.user = action.payload;
      return state;
    case Types.REMOVE_CREDENTIALS:
      state.isAuthenticated = false;
      state.user = null;
      return state;
    case Types.SET_THEME:
      state.theme = action.payload;
      return state;
    default:
      return state;
  }
};

/**
 * Matches action type with some specific interface for the payload
 */
type ActionMap<T extends { [index: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: T[Key] };
};

interface iPayload {
  [Types.SET_THEME]: 'light' | 'dark';
  [Types.SET_CREDENTIALS]: iUser | null;
  [Types.REMOVE_CREDENTIALS]: {};
}

export default reducer;
export type iAction = ActionMap<iPayload>[keyof ActionMap<iPayload>];
