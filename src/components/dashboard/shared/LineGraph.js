import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import { scaleTime } from 'd3-scale';

import CustomGraphTooltip from './CustomGraphTooltip';

import CustomTooltip from './CustomTooltip';

export default class LineGraph extends Component {
  // memoize will only call the function if items has changed, otherwise it will return the last value
  sortDataByDate = memoize((items) => items.sort(((a, b) => moment(a.date) - moment(b.date))));

  processData = (data) => {
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
    const { referenceRanges } = this.props;
    const colors = { low: '#eddadf', average: '#e7eaee', high: '#d08c9f' };

    let renderedRanges = null;
    if (referenceRanges) {
      let ranges = [];
      referenceRanges.forEach((range) => {
        ranges.push({
          y1: range.low,
          y2: range.high,
          color: colors[range.assessment] || '#fff'
        });
      });

      renderedRanges = ranges.map((range, i) => {
        return this.renderReferenceRange(range.y1, range.y2, yMax, range.color, i);
      });
    }

    return renderedRanges;
  }

  render() {
    const { title, data, unit, minPoints } = this.props;
    if (data.length < minPoints) return;

    const sortedData = this.sortDataByDate(data);
    const processedData = this.processData(sortedData);
    const [xMin, xMax] = this.getMinMax(sortedData, 'date');
    const [, yMax] = this.getMinMax(sortedData, 'value');

    return (
      <div className="line-graph"
        ref={(graphParentDiv) => { this.graphParentDiv = graphParentDiv; }}>
        <div className="line-graph__header">
          <div className="line-graph__header-title"> {title} </div>
          <div className="line-graph__header-most-recent">
            <span className="line-graph__field"> most recent: </span>
            <span className="line-graph__value"> {this.getMostRecentValue(processedData)}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={processedData}>
            {this.renderReferenceRanges(yMax)}
            <XAxis
              dataKey="date"
              type="number"
              domain={[xMin, xMax]}
              ticks={this.getTicks([xMin, xMax], 4)}
              tickFormatter={this.formatDate} />
            <YAxis dataKey="value" type="number" domain={[0, 'yMax']} />
            <Line type="monotone" dataKey="value" stroke="#4a4a4a" />
            <Tooltip content={<CustomGraphTooltip title={title} unit={unit} />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

LineGraph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  unit: PropTypes.string.isRequired,
  referenceRanges: PropTypes.array,
  minPoints: PropTypes.number
};

LineGraph.defaultProps = {
  referenceRanges: [],
  minPoints: 2
};
