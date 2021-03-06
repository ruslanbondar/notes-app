import * as actionTypes from "../actions/notes";
import { NoteState } from "../../types/note";
import { NoteActionTypes } from "../../types/actions";

const initialState: NoteState = {
  data: [],
  error: "",
  loading: false
};

const notesReducer = (
  state = initialState,
  action: NoteActionTypes
): NoteState => {
  switch (action.type) {
    case actionTypes.FETCH_NOTES_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };

    case actionTypes.FETCH_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default notesReducer;
