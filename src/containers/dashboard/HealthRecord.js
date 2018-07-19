import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import tocbot from 'tocbot';

import Summary from '../../components/dashboard/health-record/Summary';
import Procedures from '../../components/dashboard/health-record/Procedures';
import Conditions from '../../components/dashboard/health-record/Conditions';
import Labs from '../../components/dashboard/health-record/Labs';
import Medications from '../../components/dashboard/health-record/Medications';
import Allergies from '../../components/dashboard/health-record/Allergies';
import Immunizations from '../../components/dashboard/health-record/Immunizations';

export class HealthRecord extends Component {
  componentDidMount() {
    tocbot.init({
      tocSelector: '.health-record__toc',           // where to render the table of contents
      contentSelector: '.health-record__content',   // where to grab the headings to build the table of contents
      headingSelector: '.header-title',             // which headings to grab inside of the contentSelector element
      positionFixedSelector: '.health-record__toc', // element to add the positionFixedClass to
      collapseDepth: 0,                             // how many heading levels should not be collpased
      includeHtml: true,                            // include the HTML markup from the heading node
      fixedSidebarOffset: 160                       // offset from top
    });
  }

  componentWillUnmount() {
    tocbot.destroy();
  }

  labs() {
    return this.filterObservationsByCategory('laboratory') || [];
  }

  vitals() {
    return this.filterObservationsByCategory('vital-signs') || [];
  }

  filterObservationsByCategory(cat) {
    const { healthRecord } = this.props;

    if (!healthRecord || (!healthRecord.Observation)) return null;

    return this.props.healthRecord.Observation.filter((o) => {
      return o.category.filter(c => c.coding.filter(coding => coding.code === cat).length > 0).length > 0;
    });
  }

  renderHeader = (header) => {
    return (
      <div className="health-record__header">
        <div className="header-title" id={header}>{header}</div>
        <div className="header-divider"></div>
      </div>
    );
  }

  renderGroup = (name, entries) => {
    return (
      <div>
        <h2>{name}</h2>

        <ul>
          {this.renderItems(entries)}
        </ul>
      </div>
    );
  }

  renderItems = entries => {
    return entries.map((entry) => {
      return this.renderDefault(entry);
    });
  }

  renderDefault = entry => {
    return <li>{JSON.stringify(entry)}</li>;
  }

  renderGroups = () => {
    if (!this.props.healthRecord) return "";

    let sections = [];
    for (var x in this.props.healthRecord) {
      sections.push(this.renderGroup(x, this.props.healthRecord[x]));
    }

    return sections;
  }

  renderGroups = () => {
    if (!this.props.healthRecord) return "";

    let sections = [];
    for (let x in this.props.healthRecord) {
      sections.push(this.renderGroup(x, this.props.healthRecord[x]));
    }

    return sections;
  }

  renderGroup = (name, entries) => {
    return (
      <div>
        <h2>{name}</h2>
        <ul>{this.renderItems(entries)}</ul>
      </div>
    );
  }

  renderItems = entries => {
    return entries.map(e => this.renderDefault(e));
  }

  renderDefault = (entry) => {
    return (
      <li>{JSON.stringify(entry)}</li>
    );
  }

  render() {
    const { healthRecord } = this.props;

    if (this.props.loading) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    return (
      <div className="health-record">
        <div className="health-record__toc"></div>

        <div className="health-record__content">
          {this.renderHeader("summary")}
          <Summary patient={healthRecord.Patient[0]} profile={this.props.profile} />

          {this.renderHeader('conditions')}
          <Conditions conditions={healthRecord.Condition} />

          {this.renderHeader('allergies')}
          <Allergies allergies={[]} /> {/* TODO: Add allergies */}

          {this.renderHeader('medications')}
          <Medications medications={healthRecord.MedicationStatement} />

          {this.renderHeader('immunizations')}
          <Immunizations immunizations={healthRecord.Immunization} />

          {this.renderHeader('procedures')}
          <Procedures procedures={healthRecord.Procedure} />

          {this.renderHeader('labs')}
          <Labs labs={this.labs()} />

          {this.renderHeader('vitals')}
          <Labs labs={this.vitals()} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.activeProfile,
    healthRecord: state.healthRecords.healthRecord,
    loading: state.profiles.loadProfiles.isLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HealthRecord);
