import { UserTypes } from '../constants/ActionTypes';

const initState = {
  info: {
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    products: [],
  },
  errorMsg: '',
  isLoading: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case UserTypes.USER_GET_INFO: {
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    }
    case UserTypes.USER_GET_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        ...action.payload,
      };
    }
    case UserTypes.USER_GET_INFO_FAILED: {
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    }
    case UserTypes.USER_UPDATE_INFO: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }
    case UserTypes.USER_UPDATE_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        ...action.payload,
      };
    }
    case UserTypes.USER_UPDATE_INFO_FAILED: {
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    }
    case UserTypes.USER_CLEAR_ERROR: {
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;