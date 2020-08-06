import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  MAKE_POST,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_POST,
} from "../types";

import axios from "axios";

export const getAllPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((response) => {
      dispatch({
        type: SET_POSTS,
        payload: response.data,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((response) => {
      dispatch({
        type: SET_POST,
        payload: response.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((response) => {
      dispatch({
        type: LIKE_POST,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const makePost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/createPost`, newPost)
    .then((response) => {
      dispatch({
        type: MAKE_POST,
        payload: response.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((response) => {
      dispatch({
        type: UNLIKE_POST,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
