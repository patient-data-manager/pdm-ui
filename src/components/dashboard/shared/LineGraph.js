import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import { scaleTime } from 'd3-scale';

import CustomGraphTooltip from './CustomGraphTooltip';

export default class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.updateState = true;
    this.state = {
      chartWidth: 600,
      chartHeight: 200
    };
  }

  componentDidUpdate = () => {
    if (this.updateState) {
      this.updateState = false;
    } else {
      this.updateState = true;
      setTimeout(this.resize, 450);
    }
  }

  componentDidMount = () => {
    setTimeout(this.resize, 450);
  }

  // memoize will only call the function if items has changed, otherwise it will return the last value
  sortDataByDate = memoize((items) => items.sort(((a, b) => moment(a.date) - moment(b.date))));

  processData = (data, xVar, xVarNumber) => {
    let processedData = data;
    data.forEach((entry, index) => {
      processedData[index].date = moment(entry.date).valueOf();
    });
    return processedData;
  }

  getMostRecentValue = (orderedData) => {
    const lastIndex = orderedData.length - 1;
    return orderedData[lastIndex].value;
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

  resize = () => {
    if (!this.graphParentDiv) return;
    const graphParentDivWidth = this.graphParentDiv.offsetWidth;

    this.setState({
      chartWidth: graphParentDivWidth,
    });
  }
  
  renderReferenceRange(y1, y2, yMax, color, key) {
    if (y2 === 'max') {
      // If reference area has no upper limit, draw it only if patient data would be captured by it
      if (yMax > y1) { 
        // Draw refence area large enough to capture max data element if it's greater than the y1 
        // (bottom of reference area)
        return (
          <ReferenceArea key={key} y1={y1} y2={yMax} fill={color} fillOpacity="0.1" alwaysShow/>
        );
      } else { 
        // Else  draw nothing -- no relevant values would be captured by that rectangle
      }
    } else { 
      // Otherwise, draw as usual
      return (
        <ReferenceArea key={key} y1={y1} y2={y2} fill={color} fillOpacity="0.1" alwaysShow/>
      );
    }
  }

  renderReferenceRanges(yMax) {
    let renderedRanges = null;
    if (this.props.referenceRanges) {
      let ranges = [];
      this.props.referenceRanges.forEach((range) => {
        // TO-DO: get the right colors/values
        let color = null;
        switch (range.assessment) {
        case 'low':
          color = 'red';
          break;

        case 'high':
          color = 'red';
          break;

        case 'average':
          color = 'grey';
          break;

        default:
          color = 'white';
          break;
        }

        ranges.push({
          y1: range.low,
          y2: range.high,
          color: color
        });
      });

      renderedRanges = ranges.map((range, i) => {
        return this.renderReferenceRange(range.y1, range.y2, yMax, range.color, i);
      });
    } else {
      renderedRanges = null;
    }
    return renderedRanges;
  }

  render() {
    if (this.props.data.length < this.props.minPoints) return;

    const sortedData = this.sortDataByDate(this.props.data);
    const processedData = this.processData(this.props.data);
    const [xMin, xMax] = this.getMinMax(sortedData, 'date');
    const [, yMax] = this.getMinMax(sortedData, 'value');
    const yUnit = '10^9/L'; // to-do add in unit

    return (
      <div className="line-graph" 
        ref={(graphParentDiv) => { this.graphParentDiv = graphParentDiv; }}>
        <div className="line-graph__header">
          <div className="line-graph__header-title"> {this.props.title} </div>
          <div className="line-graph__header-most-recent"> 
            <span className="line-graph__field"> most recent: </span>
            <span className="line-graph__value"> {this.getMostRecentValue(processedData)}</span>
          </div>
        </div>
        <LineChart width={this.state.chartWidth} height={this.state.chartHeight} data={processedData}>
          <Line type="monotone" dataKey="value" stroke="#4a4a4a" />
          <Tooltip content={<CustomGraphTooltip title={this.props.title} unit={yUnit} />} />
          <XAxis 
            dataKey="date" 
            type="number"
            domain={[xMin, xMax]}
            ticks={this.getTicks([xMin, xMax], 4)}
            tickFormatter={this.formatDate} />
          <YAxis dataKey="value" type="number" domain={[0, 'yMax']}/>
          {this.renderReferenceRanges(yMax)}
        </LineChart>
      </div>
    );
  }
}

LineGraph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  referenceRanges: PropTypes.array,
  minPoints: PropTypes.number
};

LineGraph.defaultProps = {
  referenceRanges: [],
  minPoints: 2
};