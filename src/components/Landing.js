import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__header">
        <div className="landing__header-image">
          <img src="assets/images/landing/landing-desktop.png" alt="landing page background" />
        </div>

        <div className="landing__header-tagline">
          Putting patients in the center.
        </div>

        <div className="landing__header-buttons">
          <Link to="/login" className="button button-primary button-responsive">Log In</Link>
          <Link to="/register" className="button button-secondary button-responsive">Register</Link>
        </div>
      </div>

      <div className="landing__content-block">
        <div className="landing__content-block-header">
          <h1>The Problem</h1>

          The US healthcare system is constructed of competing standards, rules, commercial interests, and data
          management strategies, most of which do not empower the patient. Research tells us patients can more
          effectively care for their own health needs when they are empowered and electronically engaged with
          highly accurate, personal health data. Patients need unimpeded access, control, and ownership of their
          own copy of their complete, secure, private, lifetime, longitudinal health record.
        </div>

        <div className="landing__content-block-arrow"></div>

        <div className="landing__content-block-body">
          <h1>The Solution</h1>
          CAMH has reviewed the public discussion on the CMS MyHealthEData concept and suggests a policy and
          architectural approach that will put the patient in the center. CAMH’s design creates a transactional
          healthcare system, similar to other consumer-oriented businesses. It gives patients control over their
          health data and their health decisions.
        </div>
      </div>

      <h1 className="landing__banner">The Path to Patient Data Control</h1>

      <img className="landing__roadmap" src="assets/images/landing/landing-roadmap.png" alt="landing roadmap" />

      <div className="landing__content-block">
        <div className="landing__content-block-header">
          <h1 className="rosie-title">Rosie: The Health Data Manager</h1>
        </div>

        <div className="landing__content-block-arrow"></div>

        <div className="landing__content-block-body">
          <ul>
            <li>
              <div className="highlight">
                <h2>Common Data Elements</h2>
                 As outlined by ONC’s Interoperability Standards Advisory, common data elements and value sets
                 assist interoperability and simplified incorporation of health data from different sources into
                 one, longitudinal health record. With its Standard Health Record, CAMH is positioned to
                 harmonize CMS Blue Button 2.0 with ONC’s baseline Core Data Elements to display the full breadth
                 of health encounter data.
              </div>
            </li>

            <li>
              <div className="highlight">
                <h2>Health Encounter Data Receipt </h2>
                It is burdensome to obtain complete and timely health records. Using their HIPAA right of access,
                patients can send their health data from their providers to trusted third parties. After each health
                encounter, a “receipt” containing all of the encounter information will be added to the patient’s
                record.
              </div>
            </li>

            <li>
              <div className="highlight">
                <h2>Health Data Manager</h2>
                A trusted third-party entity will act as the patient’s single source of truth to aggregate and
                curate the patient’s health information for patient use and sharing with others per the patient’s
                instructions. Health data managers can be reimbursed by payers, providers, or the patient. Health
                data managers must always provide a minimum set of services that are highly protective and
                respectful of the patient and the patient’s health data.
              </div>
            </li>

            <li>
              <div className="highlight">
                <h2>Patient Data Use Agreement</h2>
                The Patient Data Use Agreement (PDUA) describes the relationship between the patient and the health
                data manager. This agreement establishes strong security and privacy requirements, patient rights
                and responsibilities, and health data manager obligations to keep patient data safe, accessible,
                and up-to-date. Value-added services can be easily monetized by health data manager vendors.
              </div>
            </li>

            <li>
              <div className="highlight">
                <h2>Ways to Test the Idea </h2>
                CAMH suggests development of a CMMI model that tests the proposed architecture by incorporating it
                into a new or existing CMMI model. CAMH is currently planning to test this architecture via a
                research demonstration in 2018.
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="landing__footer">
        <a href="https://www.mitre.org" target="_blank" rel="nofollow noopener noreferrer">
          <img className="logo-mitre" src="assets/images/landing/landing-mitre.png" alt="mitre logo" />
        </a>
      </div>
    </div>
  );
}

export default Landing;
