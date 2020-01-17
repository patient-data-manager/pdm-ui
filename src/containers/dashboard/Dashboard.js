import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';

import { logoutUser } from '../../actions/auth';
import { loadProfiles } from '../../actions/profiles';
import { loadProviders } from '../../actions/providers';
import setDashboardOpen from '../../actions/dashboard';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProfileCard from '../../components/dashboard/profiles/ProfileCard';

const drawerWidth = 260;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    backgroundColor: '#C3C7CE',
    width: drawerWidth,
    height: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: '80px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
});

export class Dashboard extends Component {
  UNSAFE_componentWillMount() {
    this.props.loadProfiles();
    this.props.loadProviders();
  }

  handleDrawerOpen = () => {
    this.props.setDashboardOpen(true);
  };

  handleDrawerClose = () => {
    this.props.setDashboardOpen(false);
  };

  renderNavListItems = () => {
    const navList = [
      { name: 'Profiles', iconName: 'user-circle', path: '/dashboard/profiles' },
      { name: 'Health Record', iconName: 'file-medical-alt', path: '/dashboard/health-record' },
      { name: 'Upload Records', iconName: 'file-medical', path: '/dashboard/upload-records' },
      { name: 'Alerts', iconName: 'exclamation-circle', path: '/dashboard/alerts' },
      { name: 'Providers', iconName: 'hospital', path: '/dashboard/providers' }
    ];

    return navList.map((navItem, index) => {
      const selected = navItem.path === this.props.location.pathname;
      const menuClassname = classNames('dashboard__menu-item', { selected });
      const navItemClassname = classNames('alert-badge', { 'open': this.props.dashboardNavIsOpen });

      return (
        <MenuItem
          button key={index}
          component={Link}
          to={navItem.path}
          selected={navItem.path === this.props.location.pathname}
          className={menuClassname}>
          {navItem.name === 'Alerts' && <div className={navItemClassname}>3</div>}
          <ListItemIcon><FontAwesomeIcon icon={navItem.iconName} fixedWidth /></ListItemIcon>
          <ListItemText primary={navItem.name} />
        </MenuItem>
      );
    });
  }

  render() {
    const { authUser, classes, theme, children, activeProfile, dashboardNavIsOpen } = this.props;

    return (
      <div className="dashboard">
        <Header authUser={authUser} logoutUser={this.props.logoutUser} />

        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, dashboardNavIsOpen && classes.appBarShift)}>
            <Toolbar disableGutters={!dashboardNavIsOpen} className="app-toolbar">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, dashboardNavIsOpen && classes.hide)}>
                <MenuIcon />
              </IconButton>

              {activeProfile && <ProfileCard profile={activeProfile} isHeader={true} />}
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !dashboardNavIsOpen && classes.drawerPaperClose),
            }}
            open={dashboardNavIsOpen}>
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>

            <Divider />

            <List>
              <div className="nav-list-items">
                {this.renderNavListItems()}
              </div>
            </List>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.toolbar} />

            <div className="dashboard__body">
              {children}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  authUser: PropTypes.string.isRequired,
  activeProfile: PropTypes.object,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  dashboardNavIsOpen: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
  loadProfiles: PropTypes.func.isRequired,
  loadProviders: PropTypes.func.isRequired,
  setDashboardOpen: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser,
    loadProfiles,
    loadProviders,
    setDashboardOpen
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: state.auth.username,
    activeProfile: state.profiles.activeProfile,
    dashboardNavIsOpen: state.dashboard.navIsOpen
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard))
);
