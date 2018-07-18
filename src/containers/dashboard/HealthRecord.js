import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  renderItems = (entries) => {
    return entries.map((e) => {
      return this.renderDefualt(e)
    });
  }

  renderDefualt = (entry) => {
    return (
      <li>
        {JSON.stringify(entry)}
      </li>
    );
  }

  renderGroups = () => {
    if(!this.props.healthRecord) return "";

    let sections = []
    for(var x in this.props.healthRecord) {
      sections.push(this.renderGroup(x,this.props.healthRecord[x]));
    }

    return sections;
  }

  render() {
    return (
      <div className="health-record">
        <div className="health-record__toc"></div>

        <div className="health-record__content">
          {this.renderHeader("summary")}
          <Summary />

          {this.renderHeader('procedures')}
          <Procedures procedures={this.procedures()}/>

          {this.renderHeader('conditions')}
          <Conditions conditions={this.conditions()}/>

          {this.renderHeader('labs')}
          <Labs labs={this.labs()}/>

          {this.renderHeader('vitals')}
          <Labs labs={this.vitals()}/>

          {this.renderHeader('medications')}
          <Medications medications={this.medications()}/>

          {this.renderHeader('immunizations')}
          <Immunizations immunizations={this.immunizations()}/>

          {this.renderHeader('allergies')}
          <Allergies allergies={this.allergies()}/>
        </div>
      </div>
    );

  }

  conditions(){
    return this.props.healthRecord.Condition || [];
  }

  procedures(){
    return this.props.healthRecord.Procedure || [];
  }

  medications(){
    return this.props.healthRecord.MedicationStatement || [];
  }

  immunizations(){
    return this.props.healthRecord.Immunization || [];
  }

  labs(){
    return this.filterObservationsByCategory('laboratory') || [];
  }

  vitals(){
    return this.filterObservationsByCategory('vital-signs') || [];
  }

  allergies(){
    return [];
  }

  filterObservationsByCategory(cat){
    return this.props.healthRecord.Observation.filter(function(o){
        return o.category.filter(c => c.coding.filter(coding => coding.code == cat).length >0).length>0
    });
  }
  renderGroups() {
  if (!this.props.healthRecord) {
    return ""
  };
  var sections = []
  for (var x in this.props.healthRecord) {
    sections.push(this.renderGroup(x, this.props.healthRecord[x]))
    }
  return sections;
  }

  renderGroup(name, entries) {
    return ( <div>
      <h2> {
        name
      } </h2> <ul> {
        this.renderItems(entries)
      } </ul> </div>)
    }

  renderItems(entries) {
    return entries.map((e) => {
      return this.renderDefualt(e)
    })
  }
  renderDefualt(entry) {
    return ( <li> {
        JSON.stringify(entry)
      } </li>)
    }
  }


function mapStateToProps(state) {
  return {
    profile: state.profiles.activeProfile,
    healthRecord: state.healthRecord.healthRecord
  };
}

export default connect(mapStateToProps)(HealthRecord);
