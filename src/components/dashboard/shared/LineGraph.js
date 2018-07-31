import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';

export default class LineGraph extends Component {
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
    // to-do how to compute these
    let chartWidth = 900;
    let chartHeight = 300;

    // figure out y max stuff

    if (this.props.data.length < 2) return;

    return (
      <div className="graph">
        {/* TO-DO: add in tooltip */}
        {/* TO-DO: figure out dates */}
        <LineChart width={chartWidth} height={chartHeight} data={this.props.data}>
          <Line type="monotone" dataKey="yVar" stroke="#8884d8" />
          <XAxis dataKey="xVar" />
          <YAxis />
          {this.renderReferenceRanges()}
        </LineChart>
      </div>
    );
  }
}

LineGraph.propTypes = {
  data: PropTypes.array.isRequired,
  referenceRanges: PropTypes.array
};

LineGraph.defaultProps = {
  referenceRanges: []
};