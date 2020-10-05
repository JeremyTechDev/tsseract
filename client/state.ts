export interface iState {
  isAuthenticated: boolean;
  authToken: {};
}

const initialState: iState = {
  isAuthenticated: false,
  authToken: {},
};

export default initialState;
