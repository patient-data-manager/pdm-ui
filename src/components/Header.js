import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { anchorEl: null };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { anchorEl } = this.state;
    const { authUser } = this.props;

    return (
      <header className="header">
        <Link to="/" className="header__logo">
          <img src="/assets/images/rosie-logo-white.png" alt="logo" />
        </Link>

        <div className="header__menu">
          <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {authUser} <FontAwesomeIcon icon="chevron-down" className="menu-arrow" />
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            className="header__menu-items"
          >
            <MenuItem onClick={this.handleClose} className="header__menu-item">
              <div onClick={this.handleLogout} onKeyPress={this.handleLogout} role="menuitem" tabIndex={0}>
                <FontAwesomeIcon icon="sign-out-alt" /> Logout
              </div>
            </MenuItem>
          </Menu>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  authUser: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
};
