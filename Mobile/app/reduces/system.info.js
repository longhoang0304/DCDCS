import { SystemTypes } from '../constants/ActionTypes';
import * as SystemState from '../constants/SystemState';

const initState = {
  sysState: SystemState.UNKNOWN,
  oldState: SystemState.UNKNOWN,
  isRain: false,
  isCloud: false,
  temperature: null,
  humidity: null,
  dryingTime: null,
  errorMsg: '',
  isSent: false,
  failedRate: 0,
};

const infoReducer = (state = initState, action) => {
  switch (action.type) {
    case SystemTypes.SYSTEM_PUBLISH_ACTION:
    case SystemTypes.SYSTEM_PUBLISH_ACTION_SUCCESS:
    case SystemTypes.SYSTEM_PUBLISH_ACTION_FAILED: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SystemTypes.SYSTEM_GET_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        failedRate: 0,
      };
    }
    case SystemTypes.SYSTEM_GET_DATA_FAILED: {
      return {
        ...state,
        ...action.payload,
        failedRate: state.failedRate + 1,
      };
    }
    case SystemTypes.SYSTEM_GET_DATA:
    default: {
      return state;
    }
  }
};

export default infoReducer;