import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import { scaleTime } from 'd3-scale';
import _ from 'lodash';

import CustomGraphTooltip from './CustomGraphTooltip';
const SystolicRanges = [{index: 0, label: "low", low: 40, high:90},
                        {index: 1,label: "ideal", low: 90, high:120},
                        {index: 2,label: "pre", low: 120, high:140},
                        {index: 3,label: "high", low: 140, high:190}];
const DiastolicRanges = [{index: 0,label: "low", low: 40, high:60},
                        {index: 1,label: "ideal", low: 60, high:80},
                        {index: 2,label: "pre", low: 80, high:90},
                        {index: 3,label: "high", low: 90, high:100}];
const ReferenceRanges = {'low': {index: 0,label: "low", y1: 0, y2:10, fill: 'blue'},
                        'ideal': {index: 1,label: "ideal", y1: 11, y2:20, fill: 'green'},
                        'pre': {index: 2,label: "pre", y1: 21, y2:30, fill: 'yellow'},
                        'high': {index: 3,label: "high", y1: 31, y2:40, fill: 'red'}};
export default class BloodPressureGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 600 };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ width: window.innerWidth });
  }

  // memoize will only call the function if items has changed, otherwise it will return the last value
  sortDataByDate = memoize((items) => items.sort(((a, b) => moment(a.date) - moment(b.date))));

  processData = (data) => {
    let processedData = data;
    data.forEach((entry, index) => {
      processedData[index].date = moment(entry.effectiveDateTime).valueOf();
      let value = this.processBPValue(entry);
      processedData[index].value = value;
    });
    return processedData;
  }

  processBPValue(entry){
    let systolic = entry.component[0];
    let diastolic = entry.component[1];
    if(systolic.code.coding[0].code !== "8480-6"){
      let temp = systolic;
      systolic = diastolic;
      diastolic = temp;
    }
    let sysRange = this.getRangeValue(systolic.valueQuantity.value, SystolicRanges);
    let diaRange = this.getRangeValue(diastolic.valueQuantity.value, DiastolicRanges);
    let range = null;
    if(diaRange.range.index === sysRange.range.index){
      range = diaRange.range.value < sysRange.range.value ? sysRange : diaRange
    }else{
      range = diaRange.range.index < sysRange.range.index ? sysRange : diaRange
    }
     let refRange = ReferenceRanges[range.range.label];
     let offset = refRange.y1;
     let value = offset + ((refRange.y2-refRange.y1) * range.value);
     return value;
  }

  getRangeValue(val, ranges){
    let value = _.round(val,2);
    let range, rangeValue = null;
    for(var i in ranges){
      range = ranges[i];
      if(value > range.low && value < range.high ){
        rangeValue = (value - range.low)/(range.high-range.low);
        break;
      }
    }
    return {range,value: rangeValue};
  }


  getMostRecentValue = (orderedData) => {
    const lastIndex = orderedData.length - 1;
    return _.round(orderedData[lastIndex].value, 2);
  }

  getMinMax = (data, key) => {
    let rangeValues = [data[0][key], data[0][key]];
    data.forEach((dataObj) => {
      if (dataObj[key] < rangeValues[0]) {
        rangeValues[0] = dataObj[key];
      } else if (dataObj[key] > rangeValues[1]) {
        rangeValues[1] = dataObj[key];
      }
    });
    return rangeValues;
  }

  getTicks = (domain, numTicks) => {
    const scale = scaleTime().domain(domain).range(domain);
    return scale.ticks(numTicks);
  }

  formatDate(dateString) {
    return moment(dateString).format(`MMM 'YY`);
  }

  renderReferenceRanges(){
    let refs = [];
    for(var refRange in ReferenceRanges){
      let range = ReferenceRanges[refRange];
      refs.push(<ReferenceArea key={range.label}
                               y1={range.y1}
                               y2={range.y2}
                              fill={range.fill}
                              fillOpacity="0.1" alwaysShow/>)
    }
    return refs;
  }

  render() {
    const { title, data, unit, minPoints } = this.props;
    if (data.length < minPoints) return null;

    const sortedData = this.sortDataByDate(data);
    const processedData = this.processData(sortedData);
    const [xMin, xMax] = this.getMinMax(sortedData, 'date');
    const [yMinValue, yMaxValue] = this.getMinMax(sortedData, 'value');
    const chartWidth = this.state.width - 350;
    const graphWidthStyle = { width: `${chartWidth}px` };
    const yMax = Math.ceil(yMaxValue + (yMaxValue * .1));
    const yMin = Math.floor(yMinValue - (yMinValue * .1));

    return (
      <div className="line-graph"
        ref={(graphParentDiv) => { this.graphParentDiv = graphParentDiv; }}>
        <div className="line-graph__header" style={graphWidthStyle}>
          <h5 id={_.lowerCase(title)}>{title}</h5>
          <div className="line-graph__header-most-recent">
            <span className="line-graph__field">most recent:</span>
            <span className="line-graph__value"> {this.getMostRecentValue(processedData)}</span>
          </div>
        </div>

        <LineChart data={processedData} height={200} width={chartWidth}>
          {this.renderReferenceRanges()}
          <XAxis
            dataKey="date"
            type="number"
            domain={[xMin, xMax]}
            ticks={this.getTicks([xMin, xMax], 4)}
            tickFormatter={this.formatDate} />
          <YAxis dataKey="value" type="number" domain={[yMin, yMax]} hide='true' />
          <Line type="monotone" dataKey="value" stroke="#4a4a4a" />
          <Tooltip content={<CustomGraphTooltip title={title} unit={unit} isBp='true' />} />
        </LineChart>
      </div>
    );
  }
}

BloodPressureGraph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  unit: PropTypes.string.isRequired,
  referenceRanges: PropTypes.array,
  minPoints: PropTypes.number
};

BloodPressureGraph.defaultProps = {
  referenceRanges: [],
  minPoints: 3
};
