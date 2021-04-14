import { GET_ABOUT_REQUEST, GET_ABOUT_SUCCESS, GET_ABOUT_FAILURE } from "./types";

const initialState = {
  text: '',
  request: {
    loading: false,
    error: null
  }
};

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT_REQUEST: {
      return {
        ...state,
        request: {
          loading: true,
          error: null,
        }
      }
    }

    case GET_ABOUT_FAILURE: {
      return {
        ...state,
        request: {
          loading: false,
          error: action.error.message,
        }
      }
    }

    case GET_ABOUT_SUCCESS: {
      return {
        ...state,
        text: action.text,
        request: {
          loading: false,
          error: null
        }
      }
    }

    default:
      return state;
  }
};