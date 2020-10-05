import React, { createContext } from 'react';

import { iAction } from './reducer';
import initialState, { iState } from './state';

const AppContext = createContext<{
  state: iState;
  dispatch: React.Dispatch<iAction>;
}>({ state: initialState, dispatch: () => null });

export default AppContext;
