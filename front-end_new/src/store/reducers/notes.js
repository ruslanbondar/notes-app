import * as actionTypes from "../actions/notes";

const initialState = {
  data: [],
  error: "",
  loading: false,
  note: {}
};

const reducer = (state = initialState, action) => {
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

    case actionTypes.FETCH_SINGLE_NOTE:
      return {
        ...state,
        note: action.data,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
