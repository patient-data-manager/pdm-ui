import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FontAwesome from 'react-fontawesome';

import { registerUser, resetRegistrationStatus } from '../../actions/auth';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      redirectToLogin: false
    };
  }

  componentDidMount() {
    // custom validator rules:
    ValidatorForm.addValidationRule('isComplexPassword', (value) => {
      if (value.length >= 6) return true;
      return false;
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value === this.state.password) return true;
      return false;
    });
  }

  componentWillUnmount() {
    this.props.resetRegistrationStatus();
  }

  handleRegister = () => {
    const { email, firstName, lastName, password, passwordConfirmation } = this.state;
    const registrationInfo = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      password_confirmation: passwordConfirmation
    };

    this.props.registerUser(registrationInfo).then(() => {
      this.setState({ redirectToLogin: true });
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBlur = ({ target }) => {
    this.refs[target.name].validate(target.value);
  };

  render() {
    const { email, firstName, lastName, password, passwordConfirmation } = this.state;
    const { registrationStatusText } = this.props;

    return (
      <div className="register">
        <div className="register__wrapper">
          <div className="register__image">
            <Link to="/"><img src="/assets/images/robot.png" alt="robot" /></Link>
          </div>

          <div className="register__form-group">
            <h3 className="auth-title">Rosie Registration</h3>

            <ValidatorForm
              className="register__form"
              ref="form"
              onSubmit={this.handleRegister}
              instantValidate={false}
            >
              <TextValidator
                label="FIRST NAME"
                onChange={this.handleChange('firstName')}
                onBlur={this.handleBlur}
                name="firstName"
                ref="firstName"
                autoComplete="given-name"
                className="register__textfield"
                fullWidth
                margin="normal"
                value={firstName}
                validators={['required']}
                errorMessages={['this field is required']}
              />

              <TextValidator
                label="LAST NAME"
                onChange={this.handleChange('lastName')}
                onBlur={this.handleBlur}
                name="lastName"
                ref="lastName"
                autoComplete="family-name"
                className="register__textfield"
                fullWidth
                margin="normal"
                value={lastName}
                validators={['required']}
                errorMessages={['this field is required']}
              />

              <TextValidator
                label="EMAIL"
                onChange={this.handleChange('email')}
                onBlur={this.handleBlur}
                name="email"
                ref="email"
                autoComplete="username"
                className="register__textfield"
                fullWidth
                margin="normal"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />

              <TextValidator
                label="PASSWORD"
                onChange={this.handleChange('password')}
                onBlur={this.handleBlur}
                name="password"
                ref="password"
                type="password"
                autoComplete="current-password"
                className="register__textfield"
                fullWidth
                margin="normal"
                value={password}
                validators={['required', 'isComplexPassword']}
                errorMessages={['this field is required', 'does not meet complexity requirements']}
              />

              <TextValidator
                label="CONFIRM PASSWORD"
                onChange={this.handleChange('passwordConfirmation')}
                onBlur={this.handleBlur}
                name="passwordConfirmation"
                ref="passwordConfirmation"
                type="password"
                autoComplete="current-password"
                className="register__textfield"
                fullWidth
                margin="normal"
                value={passwordConfirmation}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['this field is required', 'does not match password']}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button button-primary button-responsive auth-button">
                REGISTER
              </Button>

              {registrationStatusText &&
                <div className="auth-message auth-error">
                  <FontAwesome name="exclamation-circle" />
                  {registrationStatusText}
                </div>
              }

              <div className="register__login-link">
                Already have an account?
                <Link to="/login" className="">LOGIN</Link>
              </div>
            </ValidatorForm>
          </div>
        </div>

        {this.state.redirectToLogin && <Redirect push to="/login" />}
      </div>
    );
  }
}

Register.propTypes = {
  registrationStatusText: PropTypes.string,
  registerUser: PropTypes.func.isRequired,
  resetRegistrationStatus: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    registerUser,
    resetRegistrationStatus
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    registrationStatusText: state.auth.registrationStatusText
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
