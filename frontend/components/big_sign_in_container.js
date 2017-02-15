import { connect } from 'react-redux';
import { login } from '../actions/session_actions';
import BigSignIn from './big_sign_in';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.session.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => { return dispatch(login(user)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BigSignIn);
