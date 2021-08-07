// You can ref below link how to make context using Typescript
// https://react.vlpt.us/using-typescript/04-ts-context.html
import React, {
  useReducer,
  useContext,
  createContext,
  Dispatch,
} from 'react';

const LOGIN_ACTION = 'login';
  
interface LoginState {
  isLogin: boolean;
  name: string;
	cno: number | null;
}

type LoginAction =
  | { type: typeof LOGIN_ACTION; name: string; cno: number; };

type LoginDispatch = Dispatch<LoginAction>;

const LoginStateContext = createContext<LoginState | null>(null);
const LoginDispatchContext = createContext<LoginDispatch | null>(null);

// Reducer
function reducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        name: action.name,
				cno: action.cno,
        isLogin: true,
      };
    default:
      throw new Error('Unhandled action');
  }
}

// Provider
export function LoginProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    name: '',
		cno: null,
  });

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
}

// State hook
export function useLoginState(): LoginState {
  const state = useContext(LoginStateContext);
  if (!state) throw new Error('Cannot find useLoginState'); // If invalid, Then throw the error.
  return state;
}

// Dispatch hook
export function useLoginDispatch(): Dispatch<LoginAction> {
  const dispatch = useContext(LoginDispatchContext);
  if (!dispatch) throw new Error('Cannot find useLoginDispatch'); // If invalid, Then throw the error.
  return dispatch;
}