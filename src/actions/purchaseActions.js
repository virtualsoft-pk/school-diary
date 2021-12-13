import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  PURCHASE_LOADED,
  NEW_PURCHASE,
  OLD_PURCHASE,
  TYPES_LOADED,
  TYPES_ERROR,
  PURCHASE_ERROR,
  CLEAR_ERRORS,
  UPLOAD_FILE_ERROR,
  SET_LOADING,
  CLEAR_MESSAGE,
  CLEAR_FILTER_TYPE,
  UPDATE_PURCHASE,
  FILTER_PURCHASE_TYPE,
  DELETE_PURCHASE,
  PURCHASE_RETURN_LOADED,
  RETURN_PURCHASE,
  CLEAR_PURCHASE_RETURN,
} from './types';

// Load Purchase
export const loadPurchase = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://174.138.48.157/Findmyparts/purchase');

    dispatch({
      type: PURCHASE_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Load Purchase Return
export const loadPurchaseReturn = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/product_list',
      data
    );

    dispatch({
      type: PURCHASE_RETURN_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Load Types
export const loadType = () => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get('http://174.138.48.157/Findmyparts/type');

    dispatch({
      type: TYPES_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: TYPES_ERROR,
      payload: err.response.data.error,
    });
  }
};

// New Purchase
export const newPurchase = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/purchase',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: NEW_PURCHASE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Old Purchase
export const oldPurchase = (data, image, file) => async (dispatch) => {
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
          break;
      }
    }
  } catch (err) {
    dispatch({
      type: UPLOAD_FILE_ERROR,
      payload: err.response.data.error,
    });
  }

  try {
    const res = await axios.post(
      'http://174.138.48.157/Findmyparts/purchase_old',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: OLD_PURCHASE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Return Purchase
export const returnPurchase = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      `http://174.138.48.157/Findmyparts/purchase_return`,
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: RETURN_PURCHASE,
      payload: res.data,
    });
  } catch (err) {
    console.error('error: ', err);
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
};

// Update New Purchase
export const updatePurchase = (data) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post(
      `http://174.138.48.157/Findmyparts/purchase`,
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );

    dispatch({
      type: UPDATE_PURCHASE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
};

//Update Old Purchase
export const updateOldPurchase =
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
            break;
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
              break;
          }
        } catch (err) {
          dispatch({
            type: UPLOAD_FILE_ERROR,
            payload: err.response.data.error,
          });
        }
      }
    }

    try {
      const res = await axios.post(
        `http://174.138.48.157/Findmyparts/purchase_old`,
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      dispatch({
        type: UPDATE_PURCHASE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PURCHASE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

// // Update Old Purchase
// export const updatePurchase = (data) => async (dispatch) => {
//   dispatch(setLoading());
//   setAuthToken(localStorage.token);

//   try {
//     const res = await axios.post(
//       `http://174.138.48.157/Findmyparts/purchase`,
//       data,
//       {
//         headers: {
//           'content-type': 'multipart/form-data',
//         },
//       }
//     );

//     dispatch({
//       type: UPDATE_PURCHASE,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PURCHASE_ERROR,
//       payload: err.response.data.error,
//     });
//   }
// };

// Delete Purchase
export const deletePurchase = (id, type) => async (dispatch) => {
  dispatch(setLoading());
  setAuthToken(localStorage.token);

  try {
    const res =
      parseInt(type) === 1
        ? await axios.post(
            `http://174.138.48.157/Findmyparts/deletepurchase/${id}`
          )
        : await axios.delete(
            `http://174.138.48.157/Findmyparts/purchase_old/${id}`
          );

    dispatch({
      type: DELETE_PURCHASE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.error,
    });
  }
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

//Filter Purchase Type
export const filterPurchaseType = (text) => {
  return {
    type: FILTER_PURCHASE_TYPE,
    payload: text,
  };
};

// Filter Purchase
// export const filterPurchase = (text) => {
//   return {
//     type: FILTER_PURCHASE,
//     payload: text,
//   };
// };

// Clear Purchase return
export const clearPurchaseReturn = () => {
  return { type: CLEAR_PURCHASE_RETURN };
};

// // Clear Filter
// export const clearFilter = () => {
//   return { type: CLEAR_FILTER };
// };

// Clear Filter Type
export const clearFilterType = () => {
  return { type: CLEAR_FILTER_TYPE };
};
