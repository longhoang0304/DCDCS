import { AuthenticateTypes } from '../constants/ActionTypes';

const initState = {
  errorMsg: '',
  isLoading: false,
  isLogin: false,
  userId: '',
};

const authReducer = (state = initState, action) => {
  const { errorMsg, userId } = action.payload || {};
  switch (action.type) {
    case AuthenticateTypes.AUTH_LOGIN: {
      return {
        ...initState,
        isLoading: true,
      };
    }
    case AuthenticateTypes.AUTH_LOGIN_SUCCESS: {
      return {
        ...initState,
        isLoading: false,
        isLogin: true,
        userId,
      };
    }
    case AuthenticateTypes.AUTH_LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }
    case AuthenticateTypes.AUTH_LOGOUT: {
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    }
    case AuthenticateTypes.AUTH_LOGOUT_SUCCESS: {
      return initState;
    }
    case AuthenticateTypes.AUTH_LOGOUT_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;