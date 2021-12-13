import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  CATEGORY_LOADED,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_MESSAGE,
  ADD_BLOG,
  BLOG_ERROR,
  GET_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
  ADD_BLOG_CATEGORY,
  DELETE_BLOG_CATEGORY,
  FILTER_CATEGORYS,
  CATEGORY_ERROR,
  FILTER_BLOGS,
  CLEAR_CATEGORY_FILTER,
  CLEAR_FILTER,
  UPLOAD_FILE_ERROR,
} from "./types";

// get blogs from server
export const getBlogs = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`http://174.138.48.157/Findmyparts/blog`);

    dispatch({
      type: GET_BLOGS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Add New BLog
export const addBlog = (blog) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(`http://174.138.48.157/Findmyparts/blog`, blog, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch({
      type: ADD_BLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update Blog
export const updateBlog = (blog) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`http://174.138.48.157/Findmyparts/blog`, blog, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch({
      type: UPDATE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Blog from server
export const deleteBlog = (id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post(`http://174.138.48.157/Findmyparts/deleteblog/${id}`);

    dispatch({
      type: DELETE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Uploade image
export const uploadFile = (file) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      "http://174.138.48.157/Findmyparts/image_upload",
      file
    );
    return res.data;
  } catch (err) {
    dispatch({
      type: UPLOAD_FILE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Load/get Category
export const loadCategory = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://174.138.48.157/Findmyparts/blog_categories`
    );

    dispatch({
      type: CATEGORY_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// add new blog category
export const addBlogCategory = (category) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      `http://174.138.48.157/Findmyparts/blog_categories`,
      category,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: ADD_BLOG_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Category from server
export const deleteCategory = (id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.delete(
      `http://174.138.48.157/Findmyparts/blog_categories/${id}`
    );

    dispatch({
      type: DELETE_BLOG_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Filter Blog
export const filterBlog = (text) => {
  return {
    type: FILTER_BLOGS,
    payload: text,
  };
};

//Filter Category
export const filterCategory = (text) => {
  return {
    type: FILTER_CATEGORYS,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

// Clear Category Filter
export const clearCategoryFilter = () => {
  return { type: CLEAR_CATEGORY_FILTER };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
// Clear Message
export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};
