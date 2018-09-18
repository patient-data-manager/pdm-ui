import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalTimeline from '../../components/dashboard/shared/VerticalTimeline';

export class Alerts extends Component {
  approveAlert = () => {
    // remove later
    console.log('approving alert');
  }

  viewAlert = () => {
    // remove later
    console.log('viewing alert');
  }

  renderAlertsList(alerts, recentlyApproved) {
    if (alerts.length === 0) return null;

    let approve = this.approveAlert;
    if (recentlyApproved) approve = null;

    return (
      <div className="alerts-list__timeline">
        <VerticalTimeline 
          items={alerts}
          approveItem={approve}
          viewItem={this.viewAlert} />
      </div>
    );
  }

  render() {
    // remove later 
    const items = [
      { text: 'text2', date: '2017-04-05T18:19:22-04:00', icon: 'circle' },
      { text: 'text1', date: '2018-04-05T18:19:22-04:00', icon: 'circle' },
      { text: 'text4', date: '2006-04-05T18:19:22-04:00', icon: 'circle' },
      { text: 'text3', date: '2016-04-05T18:19:22-04:00', icon: 'circle' }
    ];

    return (
      <div className="alerts">
        <div className="alerts-list">
          <div className="alerts-list__title">Alerts ({items.length})</div>
          {this.renderAlertsList(items, false)}
        </div>
        <div className="alerts-list">
          <div className="alerts-list__title">Recently Approved</div>
          {this.renderAlertsList(items, true)}
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
