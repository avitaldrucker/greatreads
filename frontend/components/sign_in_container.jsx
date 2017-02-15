import { connect } from 'react-redux';
import { login, receiveErrors } from '../actions/session_actions';
import SignIn from './sign_in';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.session.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => { return dispatch(login(user)); },
    clearErrors: () => { return dispatch(receiveErrors([])); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
