import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { logIn,fetchCurrentUser } from '../../actions/current_user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email"  name="email" id="email" onChange={this.handleChange('email')}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password"  name="password" id="password" onChange={this.handleChange('password')}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={() => this.attemptLogIn() }>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Dont already have an account?  Click here to register.
                      </p>
                      <Button color="primary" className="mt-3" active onClick={() => this.redirectToRegister() }>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  redirectToRegister() {
    window.location = "#/register";
  }

  logInSuccess() {
      // this.props.fetchCurrentUser(this.props.currentUser.accessToken.access_token)
      window.location = "#/";
  }

  attemptLogIn() {
    const successHandler = () => this.logInSuccess();
    const failureHandler = () => this.setState({invalidCredentials: true});
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
