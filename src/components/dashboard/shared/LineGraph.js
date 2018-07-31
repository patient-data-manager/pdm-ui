import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';

export default class LineGraph extends Component {
  // memoize will only call the function if items has changed, otherwise it will return the last value
  sortItemsByDate = memoize((items) => items.sort(((a, b) => moment(a.date) - moment(b.date))));

  getMostRecentValue = (orderedData) => {
    const lastIndex = orderedData.length - 1;
    return orderedData[lastIndex].value;
  }
  
  renderReferenceRange(y1, y2, yMax, color, key) {
    // TO-DO: figure out this logic

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

  renderReferenceRanges() {
    let renderedRanges = null;

    // Check if the subsection contains "bands" attribute. If it does, draw them, if not don't draw them
    if (this.props.referenceRanges) {
      let ranges = [];

      // Grab the values from the summary metadata and set the bands low and high values
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
        return this.renderReferenceRange(range.y1, range.y2, 600, range.color, i);
      });
    } else {
      renderedRanges = null;
    }
    return renderedRanges;
  }

  render() {
    if (this.props.data.length < this.props.minPoints) return;

    // figure out y max stuff
    // to-do how to compute these
    let chartWidth = 900;
    let chartHeight = 300;

    const sortedData = this.sortItemsByDate(this.props.data);
    const processedData = this.processForGraphing(sortedData);
    console.log(processedData)

    return (
      <div className="line-graph">

        {/* TO-DO: add in tooltip */}
        {/* TO-DO: figure out dates */}

        <div className="line-graph__header">
          <div className="line-graph__header-title"> {this.props.title} </div>
          <div className="line-graph__header-most-recent"> 
            <span className="line-graph__field"> most recent: </span>
            <span className="line-graph__value"> {this.getMostRecentValue(sortedData)}</span>
          </div>
        </div>
        <LineChart width={chartWidth} height={chartHeight} data={sortedData}>
          <Line type="monotone" dataKey="value" stroke="#4a4a4a" />
          <XAxis dataKey="date" />
          <YAxis />
          {this.renderReferenceRanges()}
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