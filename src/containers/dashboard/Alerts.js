import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalTimeline from '../../components/dashboard/shared/VerticalTimeline';

export class Alerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [
        { id: 0, 
          text: 'white blood cell count: 7.1 10^9L', 
          date: '2018-09-05T18:19:22-04:00', 
          icon: 'flask', 
          conflictCount: 2,
          approved: false 
        },
        { id: 1, 
          text: 'dietary - wheat bran', 
          date: '2018-09-05T18:19:22-04:00', 
          icon: 'allergies', 
          approved: false 
        },
        { id: 2, 
          text: 'methimazole 10mg tablet, 1x daily', 
          date: '2018-09-05T18:19:22-04:00', 
          icon: 'pills', approved: false 
        },
        { id: 3, 
          text: 'Allergy to grass pollen', 
          date: '2018-04-05T18:19:22-04:00', 
          icon: 'allergies', approved: true 
        },
        { id: 4, 
          text: 'Camila 28 Day Pack', 
          date: '2018-04-05T18:19:22-04:00', 
          icon: 'pills', approved: true 
        },
        { id: 5, 
          text: 'Glucose 70 mg/dL', 
          date: '2014-04-05T18:19:22-04:00', 
          icon: 'flask', approved: true 
        },
        { id: 6, 
          text: 'Loratadine 5 MG Chewable Tablet', 
          date: '2016-04-05T18:19:22-04:00', 
          icon: 'pills', approved: true 
        },
        { id: 7, 
          text: 'Sodium 138 mmol/L', 
          date: '2017-04-05T18:19:22-04:00', 
          icon: 'flask', approved: true 
        },
        { id: 8, 
          text: 'Potassium 4.97 mmol/L', 
          date: '2014-04-05T18:19:22-04:00', 
          icon: 'flask', 
          approved: true 
        }
      ]
    };
  }

  approveAlert = (alert) => {
    const alerts = this.state.alerts;
    alerts[alert.id].approved = true;
    this.setState({ alerts });
  }

  viewAlert = () => {
    // remove later
  }

  renderAlertsList(approved) {
    const alerts = this.state.alerts.filter((alert) => alert.approved === approved);
    if (alerts.length === 0 && approved) return null;
    if (alerts.length === 0 && !approved) return <div className="no-entries">No alerts to approve.</div>;

    let approve= this.approveAlert;
    if (approved) approve = null;

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
    return (
      <div className="alerts">
        <div className="alerts-list">
          <div className="alerts-list__title">
            Alerts ({this.state.alerts.filter((alert) => alert.approved === false).length})
          </div>
          {this.renderAlertsList(false)}
        </div>

        <div className="alerts-list">
          <div className="alerts-list__title">Recently Approved</div>
          {this.renderAlertsList(true)}
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
