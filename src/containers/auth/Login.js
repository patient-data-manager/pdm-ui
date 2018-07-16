import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FontAwesome from 'react-fontawesome';

import { loginUser, resetLoginStatus } from '../../actions/auth';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToDashboard: false
    };
  }

  componentWillUnmount() {
    this.props.resetLoginStatus();
  }

  handleLogin = () => {
    this.props.loginUser(this.state.email, this.state.password).then(() => {
      this.setState({ redirectToDashboard: true });
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBlur = ({ target }) => {
    this.refs[target.name].validate(target.value);
  };

  render() {
    const { email, password } = this.state;
    const { authStatusText, registrationStatusText } = this.props;

    return (
      <div className="login">
        <div className="login__wrapper">
          <div className="login__image">
            <Link to="/"><img src="/assets/images/robot.png" alt="robot" /></Link>
          </div>

          <div className="login__form-group">
            <h3 className="auth-title">Rosie Login</h3>

            <ValidatorForm
              className="login__form"
              ref="form"
              onSubmit={this.handleLogin}
              instantValidate={false}
            >
              <TextValidator
                label="EMAIL"
                onChange={this.handleChange('email')}
                onBlur={this.handleBlur}
                name="email"
                ref="email"
                autoComplete="username"
                className="login__textfield"
                fullWidth
                margin="normal"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />

              <TextValidator
                label="PASSWORD"
                onChange={this.handleChange('password')}
                name="password"
                ref="password"
                type="password"
                autoComplete="current-password"
                className="login__textfield"
                fullWidth
                margin="normal"
                value={password}
                validators={['required']}
                errorMessages={['this field is required']}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button button-primary button-responsive auth-button">
                LOG IN
              </Button>

              {registrationStatusText &&
                <div className="auth-message auth-success">
                  <FontAwesome name="check" />
                  {registrationStatusText}
                </div>
              }

              {authStatusText &&
                <div className="auth-message auth-error">
                  <FontAwesome name="exclamation-circle" />
                  {authStatusText}
                </div>
              }

              <div className="login__register-link">
                Don't have an account?
                <Link to="/register" className="">REGISTER</Link>
              </div>
            </ValidatorForm>
          </div>
        </div>

        {this.state.redirectToDashboard && <Redirect to="/dashboard/profiles" />}
      </div>
    );
  }
}

Login.propTypes = {
  authStatusText: PropTypes.string,
  registrationStatusText: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
  resetLoginStatus: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser,
    resetLoginStatus
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    authStatusText: state.auth.authStatusText,
    registrationStatusText: state.auth.registrationStatusText
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
