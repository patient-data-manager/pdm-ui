import React, { Component } from 'react';
import { connect } from 'react-redux';
import tocbot from 'tocbot';

import Summary from '../../components/dashboard/health-record/Summary';

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
            <h1 id='summary'>Summary </h1>
            <Summary />
            <h1 id='procedures'>Procedures</h1>
            <p> Insert procedures component here.</p>
            <h1 id='conditions'>Conditions</h1>
            <p> Insert conditions component here.</p>
            <h1 id='labs'>Labs</h1>
            <p> Insert labs component here.</p>
            <h1 id='medications'>Medications</h1>
            <p> Insert medications component here.</p>
            <h1 id='allergies'>Allergies</h1>
            <p> Insert allergies component here.</p>
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
