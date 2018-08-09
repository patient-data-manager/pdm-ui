import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tocbot from 'tocbot';

import Allergies from '../../components/dashboard/health-record/Allergies';
import Conditions from '../../components/dashboard/health-record/Conditions';
import Immunizations from '../../components/dashboard/health-record/Immunizations';
import Labs from '../../components/dashboard/health-record/Labs';
import Medications from '../../components/dashboard/health-record/Medications';
import Procedures from '../../components/dashboard/health-record/Procedures';
import Summary from '../../components/dashboard/health-record/Summary';
import Vitals from '../../components/dashboard/health-record/Vitals';

export class HealthRecord extends Component {
  tocbotInitialized = false;

  componentDidMount() {
    if (!this.tocbotInitialized && !this.props.loading) {
      this.initializeTocbot();
    }
  }

  componentDidUpdate() {
    if (!this.tocbotInitialized && !this.props.loading) {
      this.initializeTocbot();
    }
  }

  componentWillUnmount() {
    tocbot.destroy();
  }

  initializeTocbot() {
    tocbot.init({
      tocSelector: '.health-record__toc',           // where to render the table of contents
      contentSelector: '.health-record__content',   // where to grab the headings to build the table of contents
      headingSelector: '.header-title',             // which headings to grab inside of the contentSelector element
      positionFixedSelector: '.health-record__toc', // element to add the positionFixedClass to
      collapseDepth: 0,                             // how many heading levels should not be collpased
      includeHtml: true,                            // include the HTML markup from the heading node
      fixedSidebarOffset: 160                       // offset from top
    });

    this.tocbotInitialized = true;
  }

  filterObservationsByCategory(category) {
    const { healthRecord } = this.props;

    if (!healthRecord.Observation) return null;

    return this.props.healthRecord.Observation.filter((observation) => {
      return observation.category.filter((cat) => {
        return cat.coding.filter(coding => coding.code === category).length > 0;
      }).length > 0;
    });
  }

  renderSection = (header, SectionComponent, props) => {
    return (
      <div className="health-record__section" key={header}>
        <div className="health-record__header">
          <div className="header-title" id={header}>{header}</div>
          <div className="header-divider"></div>
        </div>

        <SectionComponent {...props} />
      </div>
    );
  }

  render() {
    const { healthRecord, profile, loading } = this.props;
    let patient = {};

    if (healthRecord.Patient) patient = healthRecord.Patient[0];

    const sections = [
      { header: 'summary', component: Summary, props: { patient, profile, healthRecord } },
      { header: 'conditions', component: Conditions, props: { conditions: healthRecord.Condition || [] } },
      { header: 'allergies', component: Allergies, props: { allergies: [] } },
      { header: 'medications', component: Medications, props: {
        medicationRequests: healthRecord.MedicationRequest || [],
        medicationStatements: healthRecord.MedicationStatement || []
      } },
      { header: 'immunizations', component: Immunizations, props: { immunizations: healthRecord.Immunization || [] } },
      { header: 'procedures', component: Procedures, props: { procedures: healthRecord.Procedure || [] } },
      { header: 'labs', component: Labs, props: { labs: this.filterObservationsByCategory('laboratory') || [] } },
      { header: 'vitals', component: Vitals, props: { vitals: this.filterObservationsByCategory('vital-signs') || [] } }
    ];

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <div className="health-record">
        <div className="health-record__toc"></div>

        <div className="health-record__content">
          {sections.map((section) => {
            return this.renderSection(section.header, section.component, section.props);
          })}
        </div>
      </div>
    );
  }
}

HealthRecord.propTypes = {
  profile: PropTypes.object,
  healthRecord: PropTypes.object,
  loading: PropTypes.bool
};

HealthRecord.defaultProps = {
  healthRecord: {}
};

function mapStateToProps(state) {
  return {
    profile: state.profiles.activeProfile,
    healthRecord: state.healthRecords.healthRecord,
    loading: state.profiles.loadProfiles.isLoading
  };
}

export default connect(mapStateToProps)(HealthRecord);
