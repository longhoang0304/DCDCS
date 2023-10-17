import _ from 'lodash';
import decode from 'jwt-decode';
import { AuthenticateTypes as AuthTypes } from '../constants/ActionTypes';
import { post, APIUrl } from '../lib/helper';
import DB from '../lib/localDb';

// ============== USER LOGIN START ==============
const loggingIn = () => ({
  type: AuthTypes.AUTH_LOGIN,
});

const loginSuccess = (userId) => ({
  type: AuthTypes.AUTH_LOGIN_SUCCESS,
  payload: {
    userId,
  },
});

const loginFailed = (errorMsg) => ({
  type: AuthTypes.AUTH_LOGIN_FAILED,
  payload: {
    errorMsg,
  },
});


const login = (username, password) => async (dispatch) => {
  dispatch(loggingIn());
  let res;
  try {
    res = await post(APIUrl('auth/login'), false, {
      username,
      password,
    });
    const json = await res.json();
    if (res.ok) {
      const { token } = json;
      await DB.hsave('token', token);
      const { id } = decode(token) || {};
      if (_.isString(id)) {
        dispatch(loginSuccess(id));
        return;
      }
      dispatch(loginFailed('Invalid tokens'));
      return;
    }
    const { message } = json;
    dispatch(loginFailed(message || 'Wrong password'));
  } catch (error) {
    console.log(error.message);
    dispatch(loginFailed(error.message));
  }
};
// ================ USER LOGIN END ===============

// ============== USER LOGOUT START ==============
const loggingOut = () => ({
  type: AuthTypes.AUTH_LOGOUT,
});

const logoutSuccess = (userId) => ({
  type: AuthTypes.AUTH_LOGOUT_SUCCESS,
  payload: {
    userId,
  },
});

const logoutFailed = (errorMsg) => ({
  type: AuthTypes.AUTH_LOGOUT_FAILED,
  payload: {
    errorMsg,
  },
});


const logout = () => async (dispatch) => {
  dispatch(loggingOut());
  try {
    await DB.remove({ key: 'token' });
    dispatch(logoutSuccess());
    return;
  } catch (error) {
    console.log(error.message);
    dispatch(logoutFailed(error.message));
  }
};
// =============== USER LOGOUT END ===============

const AuthenticateActions = {
  login,
  logout,
  loginSuccess,
};

export default AuthenticateActions;