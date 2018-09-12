import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import isValid from '../../../utils/isValid';

export default class CustomGraphTooltip extends Component {


  renderBP(entry,title,unit){
    let systolic = entry.component[0];
    let diastolic = entry.component[1];
    if(systolic.code.coding[0].code !== "8480-6"){
      let temp = systolic;
      systolic = diastolic;
      diastolic = temp;
    }
    let sysVal = _.round(systolic.valueQuantity.value)
    let diaVal  = _.round(diastolic.valueQuantity.value)

    return (<div className="custom-graph-tooltip__field">
      <b>{title}:</b> {`${sysVal}/${diaVal}`} {unit}
    </div>);
  }


  renderDefault(details, title, unit){
    return (<div className="custom-graph-tooltip__field">
      <b>{title}:</b> {_.round(details.value, 2)} {unit}
    </div>);
  }

  renderDetails(details,title, unit){
    if(!this.props.isBp){
      return this.renderDefault(details,title,unit);
    }
    else {
      return this.renderBP(details,title,unit);
    }
  }

  render() {
    const { title, unit, active, payload, isBp } = this.props;
    const details = payload.length > 0 ? payload[0].payload : null;

    if (active && isValid(details)) {
      const displayDate = moment(details.date).format('MMM D, YYYY');
      return (
        <div className="custom-graph-tooltip">
          <div className="custom-graph-tooltip__field">
            <b>Date:</b> {displayDate}
          </div>
          {this.renderDetails(details,title, unit)}
        </div>
      );
    }

    return null;
  }
}

CustomGraphTooltip.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  payload: PropTypes.array,
  active: PropTypes.bool
};
