import { connect } from 'react-redux';
import Home from '../screens/Home';
import { SysActions, UserActions, ProductActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...state.info,
  ...state.user,
  ...state.products,
  isLoadingUser: state.user.isLoading,
  isLoadingProduct: state.products.isLoading,
  isPublishingAction: state.info.isLoading,
  ...ownProps,
});

const mapDispatchToProps = {
  publishAction: SysActions.publishAction,
  getData: SysActions.getDataAction,
  getUserInfo: UserActions.getInfo,
  updateSelection: ProductActions.updateSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);