import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { logIn,fetchCurrentUser } from '../../actions/current_user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import robot from '../../../images/robot.png'

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: '', errors: {}};
  }

  render() {
    return (
      <Container className="bg-white">
        <Row className="justify-content-center align-items-center">
          <Col xs="3">
            <img src={robot} className="img-fluid" />
          </Col>
          <Col xs="8">
            <div className="h-100 justify-content-center align-items-center align-middle">
              <h3 className="mb-5">MyHealthEData Login</h3>
              <InputGroup className="mb-3">
                <Input type="text" placeholder="Email" name="email" id="email" onChange={this.handleChange('email')}/>
              </InputGroup>
              { this.renderFieldErrorMessage('email') }

              <InputGroup className="mb-1">
                <Input type="password" placeholder="Password"  name="password" id="password" 
                  onChange={this.handleChange('password')} className={this.renderClassName('password')}
                  onFocus={this.handleFocus('password')} />
                { this.renderFieldIcon('password') }
              </InputGroup>
              { this.renderFieldErrorMessage('password') }

              <Row>
                <Col className="text-right">
                  <Button color="primary" className="btn-block wide-text" size="lg" onClick={() => this.attemptLogIn() }>LOG IN</Button>
                </Col>
              </Row>
              <Row>
                <Col className="text-right">
                  <div>
                    Don't have an account?
                    <Button color="link" size="sm" onClick={() => this.redirectToRegister() }>REGISTER</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  renderClassName(field) {
    const fieldErrors = this.state.errors[field];
    if (fieldErrors != null && fieldErrors.length > 0) {
      return 'is-invalid'
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

  redirectToRegister() {
    window.location = "#/register";
  }

  logInSuccess() {
      // this.props.fetchCurrentUser(this.props.currentUser.accessToken.access_token)
      window.location = "#/";
  }

  logInFailure() {
    this.setState( { errors: { password: ['is incorrect'] } } );
  }

  attemptLogIn() {
    const successHandler = () => this.logInSuccess();
    const failureHandler = () => this.logInFailure();
    this.props.logIn({email: this.state.email, password: this.state.password, grant_type: "password"}, successHandler, failureHandler);
  }

  handleChange(field) {
    return (event) => {
      let newState = {};
      newState[field] = event.target.value;
      this.setState(newState);
    };
  }
}

function mapStateToProps(state) {
  console.log("State update");
  console.log(state);
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logIn,fetchCurrentUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
