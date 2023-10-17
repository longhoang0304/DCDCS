import { ProductTypes } from '../constants/ActionTypes';

const initState = {
  errorMsg: '',
  isLoading: false,
  productList: [],
  selected: -1,
};

const productReducer = (state = initState, action) => {
  const { errorMsg, product, selected } = action.payload || {};
  switch (action.type) {
    case ProductTypes.PRODUCT_GET_INFO: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
        selected: -1,
      };
    }
    case ProductTypes.PRODUCT_GET_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        productList: [...state.productList, product],
      };
    }
    case ProductTypes.PRODUCT_GET_INFO_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }
    case ProductTypes.PRODUCT_SELECT: {
      return {
        ...state,
        selected,
      };
    }
    default: {
      return state;
    }
  }
};

export default productReducer;