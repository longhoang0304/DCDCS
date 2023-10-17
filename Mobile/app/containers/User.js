import { connect } from 'react-redux';
import UserInfo from '../screens/UserInfo';
import { UserActions, AuthActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isLogin: state.auth.isLogin,
  ...state.user,
});

const mapDispatchToProps = {
  getUserInfo: UserActions.getInfo,
  updateInfo: UserActions.updateInfo,
  clearError: UserActions.clearError,
  logout: AuthActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);