import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  PRODUCT_LOADED,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_MESSAGE,
  FILTER_PRODUCTS,
  CLEAR_FILTER,
  MAKES_LOADED,
  FILTER_MAKE,
  ADD_MAKE,
  DELETE_MAKE,
  MAKES_ERROR,
  MODEL_LOADED,
  FILTER_MODEL,
  ADD_MODEL,
  DELETE_MODEL,
  MODEL_ERROR,
  CATEGORY_LOADED,
  FILTER_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR,
  SUBCATEGORY_LOADED,
  ADD_SUBCATEGORY,
  UPDATE_SUB_CATEGORY,
  UPDATE_MAKE,
  FILTER_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  SUBCATEGORY_ERROR,
  CLEAR_FILE,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE,
  UPDATE_MODEL,
} from './types';

// Load Products
export const loadProducts = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://174.138.48.157/Findmyparts/products');

    dispatch({
      type: PRODUCT_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//ADD PRODUCT
export const addProduct = (data, image, file) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  //title image upload
  try {
    if (image) {
      const res = await axios.post(
        'http://174.138.48.157/Findmyparts/image_upload',
        image
      );

      data.image1 = res.data.data;
    } else {
      data.image1 =
        'http://174.138.48.157/public/uploads/1632647513defaultTool.jpeg';
    }

    //gallery images upload
    for (let x = 0; x < file.length; x++) {
      const res = await axios.post(
        'http://174.138.48.157/Findmyparts/image_upload',
        file[x]
      );

      switch (x) {
        case 0:
          data.image2 = res.data.data;
          break;
        case 1:
          data.image3 = res.data.data;
          break;
        case 2:
          data.image4 = res.data.data;
          break;
        default:
      }
    }
  } catch (err) {
    console.log('error: ', err);
    dispatch({
      type: UPLOAD_FILE_ERROR,
      payload: err.response.data.error,
    });
  }

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/products',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//upload excel file
export const uploadExcelFile = (files) => async (dispatch) => {
  console.log("inside action", files.length)
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    for(let x = 0 ; x < files.length; x++){
        console.log("in loop , ", files[x])
      const data = new FormData();
      data.append('file', files[x]);
      const res = await axios.post(
        'http://174.138.48.157/Findmyparts/import_excel_data',
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );
    dispatch({
      type: UPLOAD_FILE,
      payload: res.data,
    });
    }
    
  } catch (err) {
    dispatch({
      type: UPLOAD_FILE_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Update Product
export const updateProduct =
  (data, file = null, fileURL = null, image = null) =>
  async (dispatch) => {
    dispatch(setLoading());
    setAuthToken(localStorage.token);

    if (image !== null) {
      try {
        const res = await axios.post(
          'http://174.138.48.157/Findmyparts/image_upload',
          image
        );
        data.image1 = res.data.data;
      } catch (err) {
        console.log('error: ', err);
        dispatch({
          type: UPLOAD_FILE_ERROR,
          payload: err.response.data.error,
        });
      }
    }
    //condition both image select
    if (file !== null && fileURL !== null) {
      const URLLength = fileURL.length - file.length;

      for (let x = 0; x < URLLength; x++) {
        switch (x) {
          case 0:
            data.image2 = fileURL[x];
            break;
          case 1:
            data.image3 = fileURL[x];
            break;
          case 2:
            data.image4 = fileURL[x];
            break;
          default:
        }
      }

      for (let x = 0; x < file.length; x++) {
        try {
          const res = await axios.post(
            'http://174.138.48.157/Findmyparts/image_upload',
            file[x]
          );

          switch (x + URLLength) {
            case 0:
              data.image2 = res.data.data;
              break;
            case 1:
              data.image3 = res.data.data;
              break;
            case 2:
              data.image4 = res.data.data;
              break;
            default:
          }
        } catch (err) {
          console.log('error: ', err);
          dispatch({
            type: UPLOAD_FILE_ERROR,
            payload: err.response.data.error,
          });
        }
      }
    }

    try {
      const res = await axios.post(
        `http://174.138.48.157/Findmyparts/products`,
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

// Delete Product
export const deleteProduct = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  const passwordCheck = {
    id: data.id,
    password: data.password
  } 
  try {
    const res = await axios.post(
      `http://174.138.48.157/Findmyparts/check_password`,
      passwordCheck,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

   if(res.data.status){
    const res = await axios.delete(
        `http://174.138.48.157/Findmyparts/products/${data.product_id}`
      );

      dispatch({
        type: DELETE_PRODUCT,
        payload: res.data,
      });
   } 
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.error,
    });
  }
};

//LOAD MAKE
export const loadMake = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://174.138.48.157/Findmyparts/make');

    dispatch({
      type: MAKES_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: MAKES_ERROR,
      payload: err.response.data.error,
    });
  }
};

//ADD MAKE
export const addMake = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/make',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: ADD_MAKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKES_ERROR,
      payload: err.response.data.error,
    });
  }
};

//UPDATE MAKE
export const updateMake = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/make',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPDATE_MAKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKES_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Make
export const deleteMake = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(
      `http://174.138.48.157/Findmyparts/make/${id}`
    );

    dispatch({
      type: DELETE_MAKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKES_ERROR,
      payload: err.response.data.error,
    });
  }
};

//LOAD MODEL
export const loadModel = (makeId) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://174.138.48.157/Findmyparts/model_name/${makeId}`
    );

    dispatch({
      type: MODEL_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: MODEL_ERROR,
      payload: err.response.data.error,
    });
  }
};

//ADD MODEL
export const addModel = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/model_name',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: ADD_MODEL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODEL_ERROR,
      payload: err.response.data.error,
    });
  }
};

//UPDATE MODEL
export const updateModel = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/model_name',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPDATE_MODEL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODEL_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Model
export const deleteModel = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(
      `http://174.138.48.157/Findmyparts/model_name/${id}`
    );

    dispatch({
      type: DELETE_MODEL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODEL_ERROR,
      payload: err.response.data.error,
    });
  }
};

//LOAD CATEGORY
export const loadCategory = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://174.138.48.157/Findmyparts/categories');

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

//ADD CATEGORY
export const addCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/categories',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Update CATEGORY
export const updateCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/categories',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(
      `http://174.138.48.157/Findmyparts/categories/${id}`
    );

    dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

//LOAD SUBCATEGORY
export const loadSubCategory = (categoryid) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(
      `http://174.138.48.157/Findmyparts/subcategories/${categoryid}`
    );

    dispatch({
      type: SUBCATEGORY_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

//ADD SUBCAT
export const addSubCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/subcategories',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: ADD_SUBCATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Update SUBCAT
export const updateSubCategory = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/subcategories',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPDATE_SUB_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Delete SubCategory
export const deleteSubCategory = (id) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.delete(
      `http://174.138.48.157/Findmyparts/subcategories/${id}`
    );

    dispatch({
      type: DELETE_SUB_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
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
      'http://174.138.48.157/Findmyparts/image_upload',
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

// Clear File
export const clearFile = () => {
  return { type: CLEAR_FILE };
};

// Filter Products
export const filterProducts = (text) => {
  return {
    type: FILTER_PRODUCTS,
    payload: text,
  };
};

// Filter Make
export const filterMake = (text) => {
  return {
    type: FILTER_MAKE,
    payload: text,
  };
};

// Filter Model
export const filterModel = (text) => {
  return {
    type: FILTER_MODEL,
    payload: text,
  };
};

// Filter Category
export const filterCategory = (text) => {
  return {
    type: FILTER_CATEGORY,
    payload: text,
  };
};

// Filter Sub-Category
export const filterSubCategory = (text) => {
  return {
    type: FILTER_SUB_CATEGORY,
    payload: text,
  };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
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
