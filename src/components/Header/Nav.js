import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
// import { Link } from 'react-router';
import { connect } from 'react-redux';

import Logo from './Logo';

class Nav extends Component {
  render() {
    return (
      <nav className="nav navbar navbar-expand-sm  fixed-top">
        <Logo />
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            </li>
            {this.props.currentUser.accessToken ? this.renderUserMenu() : this.renderLoginMenu()}
          </ul>

      </nav>
    );
  }
  renderUserMenu(){
    return(<li role="presentation" className="nav-item dropdown">
          <a href="#"
               className="dropdown-toggle"
               data-toggle="dropdown"
               role="button"
               aria-haspopup="true"
               aria-expanded="false">
              Name <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><a href="#/logout">Logout</a></li>
            </ul>
          </li>)
        }

  renderLoginMenu(){
        return(<li role="presentation" className="nav-item dropdown">
                  <a href="#/login">Login</a>
                </li>)
      }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}


export default connect(mapStateToProps)(Nav);

Nav.displayName = 'Nav';
