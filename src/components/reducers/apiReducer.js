import {
  FETCH_PRODUCT_DATA_REQUEST,
  FETCH_PRODUCT_DATA_SUCCESS,
  FETCH_PRODUCT_DATA_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE
} from '../ReduxAction/apiAction';

const initialState = {
  data: [],
  loading: false,
  error: ''
};

const createApiReducer = (requestType, successType, failureType) => (state = initialState, action) => {
  switch (action.type) {
    case requestType:
      return {
        ...state,
        loading: true
      };
    case successType:
      return {
        loading: false,
        data: action.payload,
        error: ''
      };
    case failureType:
      return {
        loading: false,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const productApiReducer = createApiReducer(
  FETCH_PRODUCT_DATA_REQUEST,
  FETCH_PRODUCT_DATA_SUCCESS,
  FETCH_PRODUCT_DATA_FAILURE
);

const userApiReducer = createApiReducer(
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE
);

export { productApiReducer, userApiReducer };
