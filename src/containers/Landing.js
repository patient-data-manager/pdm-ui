import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div className="content-wrapper landing-column">

        <div className="col-md-9">
          <div className="landing-header">

            <div className="patients-first">
              Putting patients in the center.
            </div>
            <div className="landing-button-container">
              <a href="/#login" className="btn-sm login-button">Login</a>
              <a href="/#register" className="btn-sm  register-button">Register</a>
            </div>
          </div>
          <div className="landing-problem">
            <h5>The Problem </h5>
            The US healthcare system is constructed of competing standards, rules, commercial interests, and data management strategies, most of which do not empower the patient. Research tells us patients can more effectively care for their own health needs when they are empowered and electronically engaged with highly accurate, personal health data. Patients need unimpeded access, control, and ownership of their own copy of their complete, secure, private, lifetime, longitudinal health record.
          </div>

          <div className="landing-solution">
            <h5> The Solution </h5>
            CAMH has reviewed the public discussion on the CMS MyHealthEData concept and suggests a policy and architectural approach that will put the patient in the center. CAMH’s design creates a transactional healthcare system, similar to other consumer-oriented businesses. It gives patients control over their health data and their health decisions.
          </div>
          <div className="landing-pdc">
            <h5>The path to Patient Data Control</h5>
          </div>
          <div className="landing-robot">
          </div>
          <div className="landing-myhd">
            <h5>MYHEALTHEDATA</h5>
          </div>
          <div className="landing-highlights">
            <ul>
              <li>
                  <div>
                    <h4>Common Data Elements</h4>
                     As outlined by ONC’s Interoperability Standards Advisory, common data elements and value sets assist interoperability and simplified incorporation of health data from different sources into one, longitudinal health record. With its Standard Health Record, CAMH is positioned to harmonize CMS Blue Button 2.0 with ONC’s baseline Core Data Elements to display the full breadth of health encounter data.
                  </div>
              </li>
              <li>
                <div>
                <h4>Health Encounter Data Receipt </h4>
                It is burdensome to obtain complete and timely health records. Using their HIPAA right of access, patients can send their health data from their providers to trusted third parties. After each health encounter, a “receipt” containing all of the encounter information will be added to the patient’s record.
                  </div>
              </li>
              <li>
                <div>
                <h4>Health Data Manager</h4>
                  A trusted third-party entity will act as the patient’s single source of truth to aggregate and curate the patient’s health information for patient use and sharing with others per the patient’s instructions. Health data managers can be reimbursed by payers, providers, or the patient. Health data managers must always provide a minimum set of services that are highly protective and respectful of the patient and the patient’s health data.
                   </div>
                   </li>
                   <li>
                <div>
                <h4>Patient Data Use Agreement</h4>
                 The Patient Data Use Agreement (PDUA) describes the relationship between the patient and the health data manager. This agreement establishes strong security and privacy requirements, patient rights and responsibilities, and health data manager obligations to keep patient data safe, accessible, and up-to-date. Value-added services can be easily monetized by health data manager vendors.
                  </div>
                  </li>
                  <li>
                <div>
                <h4>Ways to Test the Idea </h4>
                CAMH suggests development of a CMMI model that tests the proposed architecture by incorporating it into a new or existing CMMI model. CAMH is currently planning to test this architecture via a research demonstration in 2018.
                  </div>
              </li>
            </ul>
          </div>
          <div className="landing-footer">
            <div className="landing-cms"></div>
            <div className="landing-mitre"></div>
          </div>
        </div>
      </div>
    );
  }
}
