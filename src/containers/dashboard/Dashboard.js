import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { logoutUser } from '../../actions/auth';
import { loadProfiles } from '../../actions/profiles';

import Header from '../../components/Header';
import ProfileCard from '../../components/dashboard/profiles/ProfileCard';

const drawerWidth = 280;

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
    }),
    fill: 'white'
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
    width: drawerWidth,
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
  },
});

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  componentWillMount() {
    this.props.loadProfiles();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  renderNavListItems = () => {
    const navList = [
      { name: 'Profiles', iconName: 'user-circle', path: '/dashboard/profiles' },
      { name: 'Health Record', iconName: 'file', path: '/dashboard/health-record' },
      { name: 'Alerts', iconName: 'exclamation-circle', path: '/dashboard/alerts' },
      { name: 'Providers', iconName: 'hospital', path: '/dashboard/providers' }
    ];

    return navList.map((navItem, index) => {
      return (
        <ListItem button key={index} component={Link} to={navItem.path}>
          <ListItemIcon><FontAwesomeIcon icon={navItem.iconName} fixedWidth /></ListItemIcon>
          <ListItemText primary={navItem.name} />
        </ListItem>
      );
    });
  }

  render() {
    const { authUser, classes, theme, children, activeProfile } = this.props;

    return (
      <div className="dashboard">
        <Header authUser={authUser} logoutUser={this.props.logoutUser} />

        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                <MenuIcon />
              </IconButton>

              {activeProfile && <ProfileCard profile={activeProfile} isHeader={true} />}
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}>
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
      </div>
    );
  }
}

Dashboard.propTypes = {
  authUser: PropTypes.string.isRequired,
  activeProfile: PropTypes.object,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser,
    loadProfiles
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authUser: state.auth.username,
    activeProfile: state.profiles.activeProfile
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard))
);
