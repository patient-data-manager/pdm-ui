import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { logOut } from '../../actions/current_user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Logout extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.logOut({ });
  }

  render() {
    return (
      <div>Logging out</div>
    );
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
  return bindActionCreators({logOut}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
