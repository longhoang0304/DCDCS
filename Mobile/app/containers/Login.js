import { connect } from 'react-redux';
import Login from '../screens/Login';
import { AuthActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...state.auth,
  ...ownProps,
});

const mapDispatchToProps = {
  login: AuthActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);