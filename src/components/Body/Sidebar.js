import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    sidebar: () => <div className="Options"><FontAwesome name="user-circle" />    PROFILES</div>,
  },
  {
    path: "/",
    sidebar: () => <div className="Options"><FontAwesome name = "heart" />    HEALTH RECORD</div>,
  },
  {
    path: "/",
    sidebar: () => <div className="Options"><FontAwesome name="exclamation-circle" />   ALERTS</div>,
  },
  {
    path: "/",
    sidebar: () => <div className="Options"><FontAwesome name="hospital-o" />   PROVIDERS</div>,
  }
];

const SidebarExample = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <div
        style={{
          listStyleType: "none",
          padding: "100px",
          width: "70%",
          background: "#f0f0f0"
        }}
      >

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>
    </div>
  </Router>
);

export default SidebarExample;
