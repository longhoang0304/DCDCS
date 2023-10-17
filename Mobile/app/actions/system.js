import decode from 'jwt-decode';
import _ from 'lodash';
import Expo from 'expo';

import { SystemTypes as SysTypes } from '../constants/ActionTypes';
import { get, post, APIUrl, getToken, alertError } from '../lib/helper';
import AuthActions from './authenticate';
import * as RequestAction from '../constants/RequestActions';
import * as SystemState from '../constants/SystemState';

/* ============= CONNECTION ACTION START ================= */
const connecting = () => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION,
});

const connectSuccess = (isLogin) => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION_SUCCESS,
  payload: {
    isLogin,
  },
});

const connectFailed = (errorMsg, healthCheck) => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION_FAILED,
  payload: {
    errorMsg,
    healthCheck,
  },
});

const connectToServer = () => async (dispatch) => {
  dispatch(connecting());
  let res;
  try {
    res = await get(APIUrl('health-check'), false);
  } catch (error) {
    dispatch(connectFailed(error.message));
    return;
  }

  if (res.ok) {
    const token = await getToken();
    if (!token) {
      dispatch(connectFailed('Your token is expired', 3));
      return;
    }
    const { id } = decode(token) || {};
    if (id && _.isString(id)) {
      dispatch(AuthActions.loginSuccess(id));
      dispatch(connectSuccess(!!token));
      return;
    }
  }
  dispatch(connectFailed('Cannot connect to server', 2));
};

/* ============== CONNECTION ACTION END ================== */

/* =============== PUBLISH ACTION START ================== */
const publishing = () => ({
  type: SysTypes.SYSTEM_PUBLISH_ACTION,
  payload: {
    isSent: false,
    errorMsg: '',
  },
});

const publishSuccess = (isSent) => ({
  type: SysTypes.SYSTEM_PUBLISH_ACTION_SUCCESS,
  payload: {
    isSent,
    errorMsg: '',
  },
});

const publishFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_PUBLISH_ACTION_FAILED,
  payload: {
    errorMsg,
  },
});

const publishAction = (payload, priority = 0) => async (dispatch, getStore) => {
  dispatch(publishing());
  const { auth, products } = getStore();
  const { userId } = auth;
  const { selected, productList } = products;
  if (selected < 0) {
    const errorMsg = 'You don\'t have any devices';
    dispatch(publishFailed(errorMsg));
    alertError(errorMsg);
    return;
  }
  const receiverId = productList[selected]._id; // eslint-disable-line
  let res;
  const pl = {
    payload,
    to: receiverId,
    from: {
      senderId: userId,
      deviceId: Expo.Constants.deviceId,
    },
    priority,
  };

  try {
    res = await post(APIUrl('actions'), true, pl);
    if (res.ok) {
      dispatch(publishSuccess(true));
      return;
    }
    const json = await res.json();
    dispatch(publishFailed(json.message));
    alertError(json.message);
  } catch (error) {
    dispatch(publishFailed(error.message));
    // alertError(error.message);
  }
};
/* ================ PUBLISH ACTION END =================== */

/* ================== GET DATA START ===================== */
const gettingData = () => ({
  type: SysTypes.SYSTEM_GET_DATA,
  payload: {
    errorMsg: '',
  },
});

const getDataSuccess = (data) => ({
  type: SysTypes.SYSTEM_GET_DATA_SUCCESS,
  payload: {
    ...data,
    errorMsg: '',
  },
});

const getDataFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_GET_DATA_FAILED,
  payload: {
    errorMsg,
  },
});

const getDataAction = () => async (dispatch) => {
  dispatch(gettingData());
  try {
    const res = await get(APIUrl(`actions/${Expo.Constants.deviceId}`), true);
    const json = await res.json();
    // if (res.status === 404) {
    //   dispatch(getDataFailed(''));
    //   return;
    // }
    if (res.ok) {
      const { action, data } = json.payload || {};
      if (action === RequestAction.UPDATE_INFO) {
        dispatch(getDataSuccess(data));
      }
      return;
    }
    dispatch(getDataFailed(json.message));
    // alertError(json.message);
  } catch (error) {
    dispatch(getDataFailed(error.message));
    alertError(error.message);
  }
};
/* =================== GET DATA END ====================== */

const SystemActions = {
  connectToServer,
  publishAction,
  getDataAction,
};

export default SystemActions;