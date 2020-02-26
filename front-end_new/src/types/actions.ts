import { Note } from "./note";

export const FETCH_NOTES_REQUEST = "FETCH_NOTES_REQUEST";
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";
export const FETCH_NOTES_FAILURE = "FETCH_NOTES_FAILURE";

export interface fetchNotesRequestAction {
  type: typeof FETCH_NOTES_REQUEST;
}

export interface fetchNotesSuccessAction {
  type: typeof FETCH_NOTES_SUCCESS;
  data: Note[];
}

export interface fetchNotesFailureAction {
  type: typeof FETCH_NOTES_FAILURE;
  error: string;
}

export type NoteActionTypes =
  | fetchNotesRequestAction
  | fetchNotesSuccessAction
  | fetchNotesFailureAction;

export type AppActions = NoteActionTypes;
