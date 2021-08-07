// You can ref below link how to make context using Typescript
// https://react.vlpt.us/using-typescript/04-ts-context.html

import React, {
    useReducer,
    useContext,
    createContext,
    Dispatch,
  } from 'react';
  
  const BOOK_TITLE_CHANGE_ACTION = 'bookTitleChange';
  const AUTHOR_CHANGE_ACTION = 'authorChange';
  const PUBLISHER_CHANGE_ACTION = 'publisherChange';
  const YEAR_CHANGE_ACTION = 'yearChange';
	const LOGIC_CHANGE_ACTION = 'logicChange';
    
  interface InputState {
    bookTitle: string;
    author: string;
    publisher: string;
    year: string;
		logic: 'and' | 'or';
  }
  
  type InputAction =
    | { type: typeof BOOK_TITLE_CHANGE_ACTION; bookTitle: string; }
    | { type: typeof AUTHOR_CHANGE_ACTION; author: string; }
    | { type: typeof PUBLISHER_CHANGE_ACTION; publisher: string; }
    | { type: typeof YEAR_CHANGE_ACTION; year: string; }
		| { type: typeof LOGIC_CHANGE_ACTION; logic: 'and' | 'or'; };
  
  type InputDispatch = Dispatch<InputAction>;
  
  const InputStateContext = createContext<InputState | null>(null);
  const InputDispatchContext = createContext<InputDispatch | null>(null);
  
  // Reducer
  function reducer(state: InputState, action: InputAction): InputState {
		console.log(state);
    switch (action.type) {
      case BOOK_TITLE_CHANGE_ACTION:
        return {
          ...state,
          bookTitle: action.bookTitle,
        };
			
			case AUTHOR_CHANGE_ACTION:
				return {
					...state,
					author: action.author,
				};
			
			case PUBLISHER_CHANGE_ACTION:
				return {
					...state,
					publisher: action.publisher,
				};

			case YEAR_CHANGE_ACTION:
				return {
					...state,
					year: action.year,
				};

			case LOGIC_CHANGE_ACTION:
				return {
					...state,
					logic: action.logic,
				};

      default:
        throw new Error('Unhandled action');
    }
  }
  
  // Provider
  export function InputProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [state, dispatch] = useReducer(reducer, {
			bookTitle: '',
			author: '',
			publisher: '',
			year: '',
			logic: 'and',
    });
  
    return (
      <InputStateContext.Provider value={state}>
        <InputDispatchContext.Provider value={dispatch}>
          {children}
        </InputDispatchContext.Provider>
      </InputStateContext.Provider>
    );
  }
  
  // State hook
  export function useInputState(): InputState {
    const state = useContext(InputStateContext);
    if (!state) throw new Error('Cannot find useInputState'); // If invalid, Then throw the error.
    return state;
  }
  
  // Dispatch hook
  export function useInputDispatch(): Dispatch<InputAction> {
    const dispatch = useContext(InputDispatchContext);
    if (!dispatch) throw new Error('Cannot find useInputDispatch'); // If invalid, Then throw the error.
    return dispatch;
  }