import React, { Component } from 'react';
import { signUp } from '../../actions/current_user_actions';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import robot from '../../../images/robot.png'

export class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', first_name: '', last_name: '', password: '', password_confirmation: '', errors: {} };
  }

  render() {
    return (
      <Container className="bg-white">
        <Row className="justify-content-center align-items-center">
          <Col xs="3">
            <img src={robot} className="img-fluid" />
          </Col>
          <Col xs="8">
            <h3 className="mb-5">MyHealthEData Registration</h3>
            <InputGroup className="mb-3">
              <Input type="text" placeholder="First Name" value={this.state.first_name} name="first_name" id="first_name"
                onChange={this.handleChange('first_name')} className={this.renderClassName('first_name')}
                onFocus={this.handleFocus('first_name')} onBlur={() => this.validateFirstName()} />
              {this.renderFieldIcon('first_name')}
            </InputGroup>
            <InputGroup className="mb-3">
              <Input type="text" placeholder="Last Name" value={this.state.last_name} name="last_name" id="last_name"
                onChange={this.handleChange('last_name')} className={this.renderClassName('last_name')}
                onFocus={this.handleFocus('last_name')} onBlur={() => this.validateLastName()} />
              {this.renderFieldIcon('last_name')}
            </InputGroup>
            <InputGroup className="mb-3">
              <Input type="text" placeholder="Email" value={this.state.email} name="email" id="email"
               onChange={this.handleChange('email')} className={this.renderClassName('email')}
               onFocus={this.handleFocus('email')} onBlur={() => this.validateEmail()} />
              {this.renderFieldIcon('email')}
            </InputGroup>
            { this.renderFieldErrorMessage('email') }

            <InputGroup className="mb-3">
              <Input type="password" placeholder="Password" name="password" id="password"
               onChange={this.handleChange('password')} className={this.renderClassName('password')}
               onFocus={this.handleFocus('password')} onBlur={() => this.validatePassword()} />
              {this.renderFieldIcon('password')}
            </InputGroup>
            { this.renderFieldErrorMessage('password') }

            <InputGroup className="mb-4">
              <Input type="password"  placeholder="Repeat password"  name="password_confirmation" id="password_confirmation"
               onChange={this.handleChange('password_confirmation')} className={this.renderClassName('password_confirmation')}
               onFocus={this.handleFocus('password_confirmation')} onBlur={() => this.validateConfirmation()} />
              {this.renderFieldIcon('password_confirmation')}
            </InputGroup>
            { this.renderFieldErrorMessage('password_confirmation') }

            <Row>
              <Col className="text-right">
                <Button color="primary" className="btn-block wide-text" size="lg" onClick={() => this.attemptSignUp() }>REGISTER</Button>
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <div>
                  Already have an account?
                  <Button color="link" size="sm" active onClick={() => this.redirectToLogin() }>LOG IN</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  handleFocus(field) {
    return (e) => {
      this.setStateErrors(field, undefined);
    };
  }

  setStateErrors(field, newErrors) {
    this.setState((prevState) => {
        let newState = { errors: Object.assign({}, prevState.errors) };
        newState.errors[field] = newErrors;
        return newState;
      });
  }

  validateFirstName() {
    let firstName = this.state.first_name;
    let errors = [];

    if (this.isBlank(firstName)) {
      errors.push("can't be blank");
    }

    this.setStateErrors('first_name', errors);
  }

  validateLastName() {
    let lastName = this.state.last_name;
    let errors = [];

    if (this.isBlank(lastName)) {
      errors.push("can't be blank");
    }

    this.setStateErrors('last_name', errors);
  }

  validateEmail() {
    console.log("validating email");
    let email = this.state.email;
    let errors = [];

    if (this.isBlank(email)) {
      errors.push("can't be blank");
    } else if (!this.isValidEmail(email)) {
      errors.push('address is invalid');
    }

    this.setStateErrors('email', errors);
  }

  validatePassword() {
    let password = this.state.password;
    let errors = [];

    if (this.isBlank(password)) {
      errors.push("can't be blank");
    } else if (!this.isValidPassword(password)) {
      errors.push('does not meet complexity requirements');
    }

    this.setStateErrors('password', errors);
  }

  validateConfirmation() {
    let password = this.state.password;
    let confirmation = this.state.password_confirmation;
    let errors = [];

    if (this.isBlank(confirmation)) {
      errors.push("can't be blank");
    } else if (!this.isMatchingPassword(password, confirmation)) {
      errors.push("doesn't match password");
    }

    this.setStateErrors('password_confirmation', errors);
  }

  isBlank(str) {
    return str === null || str.length === 0;
  }

  isValidEmail(email) {
    // regex just checks for @ and .
    return email && email.length > 0 && /.+\@.+\..+/.test(email);
  }

  isValidPassword(password) {
    return password && password.length >= 6;
  }


  isMatchingPassword(password, confirmation) {
    return password && confirmation
          && password === confirmation;
  }

  renderClassName(field) {
    const fieldErrors = this.state.errors[field];
    if (fieldErrors != null && fieldErrors.length > 0) {
      return 'is-invalid';
    }
    return '';
  }

  renderFieldIcon(field) {
    const fieldErrors = this.state.errors[field];
    const fieldValue = this.state[field];

    if (fieldErrors && fieldErrors.length > 0) {
      // error
      return (<InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-exclamation-circle text-danger"></i>
                </InputGroupText>
              </InputGroupAddon>);
    } else if (fieldErrors != null && fieldValue != null && fieldValue.length > 0) {
      // valid
      return (<InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-check text-success"></i>
                </InputGroupText>
              </InputGroupAddon>);
    }  else {
      // empty, do nothing
      return null;
    }
  }

  renderFieldErrorMessage(field) {
    const fieldErrors = this.state.errors[field];
    if (fieldErrors != null && fieldErrors.length > 0) {
      const message = (field + ' '+ fieldErrors[0]).replace(/_/g, ' ').toLowerCase(); // TODO: string join
      return (<div className="invalid-feedback" style={{display: 'block'}}>{message}</div>);
    }
    return null;
  }

  attemptSignUp() {
    const successHandler = () => this.registrationSuccess();
    const failureHandler = (failureResponse) => this.registrationFailure(failureResponse);
    signUp(this.state, successHandler, failureHandler);
  }

  redirectToLogin() {
    window.location = "#/login";
  }

  registrationSuccess() {
    window.location = "#/"; // redirect to / so that it will auto-redirect to /login
    // TODO: figure out how to show a message saying "registration successful"
  }

  registrationFailure(resp) {
    this.setState({errors: resp.response.data.errors})
  }

  handleChange(field) {
    return (event) => {
      let newState = {};
      newState[field] = event.target.value;
      this.setState(newState);
    };
  }
}

export default Register;
