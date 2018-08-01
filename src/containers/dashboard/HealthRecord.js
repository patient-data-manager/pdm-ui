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

  // getPatientTimelineComponents() {
  //   const { healthRecord } = this.props;
  //   let all_items = [];
  //   let props_contents = {};
  //   props_contents['groups'] =  [
  //     { 'id': 1, 'title': 'procedure' },
  //     { 'id': 2, 'title': 'condition' },
  //     { 'id': 3, 'title': 'lab' },
  //     { 'id': 4, 'title': 'medication' }
  //   ];
  //   props_contents['legendItems'] = [
  //     { 'icon': 'hospital-o', 'description': 'procedure' },
  //     { 'icon': 'heartbeat', 'description': 'condition' },
  //     { 'icon': 'flask', 'description': 'lab' },
  //     { 'icon': 'stethoscope', 'description': 'medication' }
  //   ];
  //   let a = 0;
  //   let id_c = 0;
  //   if (healthRecord.Procedure)
  //   {
  //     for (a = 0; a < healthRecord.Procedure.length; a++)
  //     {
  //       id_c += 1;
  //       let info_hash = {};
  //       info_hash['id'] = id_c;
  //       info_hash['groups'] = 1;
  //       info_hash['title'] = healthRecord.Procedure[a].code.text;
  //       info_hash['start_time'] = moment(healthRecord.Procedure[a].performedDateTime);
  //       info_hash['end_time'] = moment(healthRecord.Procedure[a].performedDateTime).add(1, 'days');
  //       info_hash['class'] = 'fa fa-hospital-o';
  //       all_items.push(info_hash);
  //     }
  //   }

  //   if (healthRecord.Condition)
  //   {
  //     for (a = 0; a < healthRecord.Condition.length; a++)
  //     {
  //       id_c += 1;
  //       let info_hash = {};
  //       info_hash['id'] = id_c;
  //       info_hash['groups'] = 2;
  //       info_hash['title'] = healthRecord.Condition[a].code.text;
  //       info_hash['start_time'] = moment(healthRecord.Condition[a].onsetDateTime);
  //       info_hash['end_time'] = moment(healthRecord.Condition[a].onsetDateTime).add(1, 'days');
  //       info_hash['class'] = 'fa fa-heartbeat';
  //       all_items.push(info_hash);
  //     }
  //   }

  //   if (healthRecord.MedicationStatement)
  //   {
  //     for (a = 0; a < healthRecord.MedicationStatement.length; a++)
  //     {
  //       id_c += 1;
  //       let info_hash = {};
  //       info_hash['id'] = id_c;
  //       info_hash['groups'] = 3;
  //       info_hash['title'] = healthRecord.MedicationStatement[a].medicationCodeableConcept.text;
  //       info_hash['start_time'] = moment(healthRecord.MedicationStatement[a].effectivePeriod.start);
  //       info_hash['end_time'] = moment().clone();
  //       info_hash['class'] = 'fa fa-heartbeat';
  //       all_items.push(info_hash);
  //     }
  //   }
  //   props_contents['items'] = all_items;
  //   return props_contents;
  // }

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
      { header: 'medications', component: Medications, props: { medications: healthRecord.MedicationStatement || [] } },
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
