import { notesAPI } from "../../api/api";
import { Note } from "../../types/note";
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";

export const FETCH_NOTES_REQUEST = "FETCH_NOTES_REQUEST";
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";
export const FETCH_NOTES_FAILURE = "FETCH_NOTES_FAILURE";

const fetchNotesRequest = (): AppActions => {
  return {
    type: FETCH_NOTES_REQUEST
  };
};

const fetchNotesSuccess = (data: Note[]): AppActions => {
  return {
    type: FETCH_NOTES_SUCCESS,
    data
  };
};

const fetchNotesFailure = (error: string): AppActions => {
  return {
    type: FETCH_NOTES_FAILURE,
    error
  };
};

export const getNotes = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchNotesRequest());

    try {
      const data = await notesAPI.getNotes();
      dispatch(fetchNotesSuccess(data));
    } catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  };
};

export const addNote = (newData: {}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchNotesRequest());

    try {
      await notesAPI.addNote(newData);
      const data = await notesAPI.getNotes();
      dispatch(fetchNotesSuccess(data));
    } catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  };
};

export const updateNote = (newData: {}, id: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchNotesRequest());

    try {
      await notesAPI.updateNote(newData, id);
      const data = await notesAPI.getNotes();
      dispatch(fetchNotesSuccess(data));
    } catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  };
};

export const deleteNote = (id: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchNotesRequest());

    try {
      await notesAPI.deleteNote(id);
      const data = await notesAPI.getNotes();
      dispatch(fetchNotesSuccess(data));
    } catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  };
};

export const deleteAll = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchNotesRequest());

    try {
      await notesAPI.deleteAll();
      const data = await notesAPI.getNotes();
      dispatch(fetchNotesSuccess(data));
    } catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  };
};
