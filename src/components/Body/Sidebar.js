import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import FontAwesome from 'react-fontawesome';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/profiles",
    // sidebar: () => <div className="Options"><FontAwesome name="user-circle" />PROFILES</div>,
    main: () => <h2> INSERT PROFILE PANEL HERE </h2>
  },
  {
    path: "/health_record"
    // sidebar: () => <div className="Options"><FontAwesome name = "heart" />HEALTH RECORD</div>,
  },
  {
    path: "/alerts"
    // sidebar: () => <div className="Options"><FontAwesome name="exclamation-circle" />ALERTS</div>,
  },
  {
    path: "/providers"
    // sidebar: () => <div className="Options"><FontAwesome name="hospital-o" />PROVIDERS</div>,
  }
];

const Sidebar = () => (

  <div className='sidebar'>
     <SideNav highlightColor='#fff' highlightBgColor='#6699cc'>
         <Nav id='profiles'>
             <NavIcon><FontAwesome name='user-circle' /></NavIcon>
             <NavText> PROFILES </NavText>
         </Nav>
         <Nav id='healthRecord' className='Options'>
             <NavIcon><FontAwesome name='heart' /></NavIcon>
             <NavText> HEALTH RECORD </NavText>
         </Nav>
         <Nav id='alerts' className='Options'>
             <NavIcon><FontAwesome name='exclamation-circle' /></NavIcon>
             <NavText> ALERTS </NavText>
         </Nav>
         <Nav id='providers' className='Options'>
             <NavIcon><FontAwesome name='hospital-o' /></NavIcon>
             <NavText> PROVIDERS </NavText>
         </Nav>
      </SideNav>
  </div>
  // <Router>
  //   <div style={{ display: "flex" }}>
  //     <div
  //       style={{
  //         listStyleType: "none",
  //         marginTop: "100px",
  //         marginLeft: "15px",
  //         padding: "10px",
  //         width: "100%",
  //         height: "100%",
  //         background: "#f0f0f0"
  //       }}
  //     >
  //     <ul style={{ listStyleType: "none", padding: 0 }}>
  //       <li>
  //         <div className="Options">
  //           <Link to="/profiles">
  //             <FontAwesome name="user-circle" /> PROFILES
  //           </Link>
  //         </div>
  //       </li>
  //       <li>
  //         <div className="Options">
  //           <Link to="/health_record">
  //             <FontAwesome name="heart" /> HEALTH RECORD
  //           </Link>
  //         </div>
  //       </li>
  //       <li>
  //         <div className="Options">
  //           <Link to="/alerts">
  //             <FontAwesome name="exclamation-circle" /> ALERTS
  //           </Link>
  //         </div>
  //       </li>
  //       <li>
  //         <div className="Options">
  //           <Link to="/providers">
  //             <FontAwesome name="hospital-o" /> PROVIDERS
  //           </Link>
  //         </div>
  //       </li>
  //     </ul>
  //
  //       {routes.map((route, index) => (
  //         // You can render a <Route> in as many places
  //         // as you want in your app. It will render along
  //         // with any other <Route>s that also match the URL.
  //         // So, a sidebar or breadcrumbs or anything else
  //         // that requires you to render multiple things
  //         // in multiple places at the same URL is nothing
  //         // more than multiple <Route>s.
  //         <Route
  //           key={index}
  //           path={route.path}
  //           exact={route.exact}
  //           component={route.sidebar}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // </Router>
);

export default Sidebar;
