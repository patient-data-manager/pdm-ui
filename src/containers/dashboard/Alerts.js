import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalTimeline from '../../components/dashboard/shared/VerticalTimeline';

export class Alerts extends Component {
  renderAlertsList(alerts) {
    if (alerts.length === 0) return null;

    return (
      <div className="alerts-list__timeline">
        <VerticalTimeline items={alerts} />
      </div>
    );
  }

  render() {
    // remove later 
    const items = [
      { text: 'sarah', date: '2017-04-05T18:19:22-04:00' },
      { text: 'ober', date: '2018-04-05T18:19:22-04:00' },
      { text: 'talia', date: '2006-04-05T18:19:22-04:00' },
      // { text: 'cramer', date: '2016-04-05T18:19:22-04:00' }
    ];

    return (
      <div className="alerts">
        <div className="alerts-list">
          <div className="alerts-list__title">Alerts (insert count here)</div>
          {this.renderAlertsList(items)}
        </div>
        <div className="alerts-list">
          <div className="alerts-list__title">Recently Approved</div>
          {this.renderAlertsList([])}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Alerts);
