import React, { Component } from 'react';
import { connect } from 'react-redux';
import tocbot from 'tocbot';

import Summary from '../../components/dashboard/health-record/Summary';
import Procedures from '../../components/dashboard/health-record/Procedures';
import Conditions from '../../components/dashboard/health-record/Conditions';
import Labs from '../../components/dashboard/health-record/Labs';
import Medications from '../../components/dashboard/health-record/Medications';
import Allergies from '../../components/dashboard/health-record/Allergies';

export class HealthRecord extends Component {

  componentDidMount() {
    tocbot.init({
      tocSelector: '.js-toc',           // where to render the table of contents
      contentSelector: '.js-toc-content',   // where to grab the headings to build the table of contents
      headingSelector: 'h1'              // which headings to grab inside of the contentSelector element
    });
  }

  render() {
    return (
      <div className='health-record'>
        <div className='health-record__body'>
          <div className='js-toc'></div>
          <div className='js-toc-content'>
            <div className='health-record__header'>
              <h1 id='summary'> SUMMARY</h1>
              <hr />
            </div>
            <Summary />
            <div className='health-record__header'>
              <h1 id='procedures'> PROCEDURES</h1>
            </div>
            <Procedures />
            <div className='health-record__header'>
              <h1 id='conditions'> CONDITIONS</h1>
            </div>
            <Conditions />
            <div className='health-record__header'>
              <h1 id='labs'> LABS</h1>
            </div>
            <Labs />
            <div className='health-record__header'>
              <h1 id='medications'> MEDICATIONS</h1>
            </div>
            <Medications />
            <div className='health-record__header'>
              <h1 id='allergies'> ALLERGIES</h1>
            </div>
            <Allergies />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.currentProfile
  };
}

export default connect(mapStateToProps)(HealthRecord);
