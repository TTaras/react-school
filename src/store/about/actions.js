import { GET_ABOUT_REQUEST, GET_ABOUT_SUCCESS, GET_ABOUT_FAILURE } from "./types";
import request from '@utils/request';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getAbout = () =>
  async (dispatch) => {
    try {
      dispatch(getAboutRequest());

      const req = request.create('/api/about.html', null, 'text');
      const responce = await req.send();
      await wait(1000);
      dispatch(getAboutSuccess(responce));
    } catch (error) {
      dispatch(getAboutFailure(error));
    }
  }

export const getAboutRequest = () => ({
  type: GET_ABOUT_REQUEST,
})

export const getAboutSuccess = (text) => ({
  type: GET_ABOUT_SUCCESS,
  text,
})

export const getAboutFailure = (error) => ({
  type: GET_ABOUT_FAILURE,
  error,
})

