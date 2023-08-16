import axios from 'axios';

// Types
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';


// export const fetchDataRequest = () => ({
//   type: FETCH_DATA_REQUEST
// });

// export const fetchDataSuccess = data => ({
//   type: FETCH_DATA_SUCCESS,
//   payload: data
// });

// export const fetchDataFailure = error => ({
//   type: FETCH_DATA_FAILURE,
//   payload: error
// });


// Action Types
export const FETCH_PRODUCT_DATA_REQUEST = 'FETCH_PRODUCT_DATA_REQUEST';
export const FETCH_PRODUCT_DATA_SUCCESS = 'FETCH_PRODUCT_DATA_SUCCESS';
export const FETCH_PRODUCT_DATA_FAILURE = 'FETCH_PRODUCT_DATA_FAILURE';

export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';

// Action Creator
export const fetchDataRequest = (type) => ({
  type: type + '_REQUEST'
});

export const fetchDataSuccess = (type, data) => ({
  type: type + '_SUCCESS',
  payload: data
});

export const fetchDataFailure = (type, error) => ({
  type: type + '_FAILURE',
  payload: error
});


export const fetchProductData = () => {
  return dispatch => {
    dispatch(fetchDataRequest('FETCH_PRODUCT_DATA'));
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const data = response.data;
        dispatch(fetchDataSuccess('FETCH_PRODUCT_DATA',data));
      })
      .catch(error => {
        dispatch(fetchDataFailure('FETCH_PRODUCT_DATA',error.message));
      });
  };
};


export const fetchUserData = () => {
  return dispatch => {
    dispatch(fetchDataRequest('FETCH_USER_DATA',));
    axios.get('https://dummyjson.com/users')
      .then(response => {
        const data = response.data;
        dispatch(fetchDataSuccess('FETCH_USER_DATA',data));
      })
      .catch(error => {
        dispatch(fetchDataFailure('FETCH_USER_DATA',error.message));
      });
  };
};