import { iState } from './state';

type ActionMap<T extends { [index: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: T[Key] };
};

export enum Types {
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
  REMOVE_AUTH_TOKEN = 'REMOVE_AUTH_TOKEN',
}

type iPayload = {
  [Types.SET_AUTH_TOKEN]: {
    id: string;
  };
};

export type iAction = ActionMap<iPayload>[keyof ActionMap<iPayload>];

const reducer = (state: iState, action: iAction) => {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_AUTH_TOKEN:
      Object.assign(state.authToken, payload);
      return state;
    default:
      return state;
  }
};

export default reducer;
