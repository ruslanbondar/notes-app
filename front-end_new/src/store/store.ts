import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notesReducer from "./reducers/notesReducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "types/actions";

export const rootReducer = combineReducers({
  notes: notesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);
