import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { signUp} from '../../actions/current_user_actions';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', first_name: '', last_name: '', password: '', password_confirmation: ''};
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" value={this.state.email} name="email" id="email" onChange={this.handleChange('email')}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="First Name" value={this.state.firstName} name="first_name" id="first_name" onChange={this.handleChange('first_name')}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Last Name" value={this.state.lastName} name="last_name" id="last_name" onChange={this.handleChange('last_name')}/>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" name="password" id="password" onChange={this.handleChange('password')}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password"  placeholder="Repeat password"  name="password_confirmation" id="password_confirmation" onChange={this.handleChange('password_confirmation')}/>
                  </InputGroup>
                  <Button color="success" block onClick={() => this.attemptSignUp() }>Create Account</Button>
                </CardBody>
                <CardFooter className="p-4">
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  attemptSignUp() {
    const successHandler = () => this.props.closer();
    const failureHandler = (failureResponse) => this.setState({errors: failureResponse.response.data.errors});
    signUp(this.state, successHandler, failureHandler);
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
