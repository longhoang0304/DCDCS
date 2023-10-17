import { ProductTypes } from '../constants/ActionTypes';
import { get, APIUrl } from '../lib/helper';

// ============== GET USER DATA START ==============
const gatheringData = () => ({
  type: ProductTypes.PRODUCT_GET_INFO,
});

const getDataSuccess = (product) => ({
  type: ProductTypes.PRODUCT_GET_INFO_SUCCESS,
  payload: {
    product,
  },
});

const getDataFailed = (errorMsg) => ({
  type: ProductTypes.PRODUCT_GET_INFO_FAILED,
  payload: {
    errorMsg,
  },
});


const getInfo = (productId) => async (dispatch) => {
  dispatch(gatheringData());
  let res;
  try {
    res = await get(APIUrl(`products/${productId}`), true);
    const json = await res.json();
    if (res.ok) {
      dispatch(getDataSuccess(json));
      return;
    }
    const { message } = json;
    dispatch(getDataFailed(message || 'Unknown Error Occurred'));
  } catch (error) {
    console.log(error.message);
    dispatch(getDataFailed(error.message));
  }
};
// ============== GET USER DATA END ==============

const updateSelection = (selected) => ({
  type: ProductTypes.PRODUCT_SELECT,
  payload: {
    selected,
  },
});

const ProductActions = {
  getInfo,
  updateSelection,
};

export default ProductActions;