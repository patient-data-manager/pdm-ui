import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoize from 'memoize-one';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';

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
  sortItemsByDate = memoize((items) => items.sort(((a, b) => moment(a.date) - moment(b.date))));

  getMostRecentValue = (orderedData) => {
    const lastIndex = orderedData.length - 1;
    return orderedData[lastIndex].value;
  }

  getMinMax = (data) => {
    let rangeValues = [data[0].value, data[0].value];
    data.forEach((dataObj) => {
      if (dataObj.value < rangeValues[0]) {
        rangeValues[0] = dataObj.value;
      } else if (dataObj.value > rangeValues[1]) {
        rangeValues[1] = dataObj.value;
      }
    });
    return rangeValues;
  }

  xVarFormatFunction = (xVarNumber) => {
    return 'Date: ' + xVarNumber;
  }

  createYVarFormatFunctionWithUnit = (unit) => {
    return (value) => {
      return `${value} ${unit}`;
    };
  }

  // processForGraphing = (data, xVar, xVarNumber) => {
  //   // const dataCopy = Lang.clone(data);
  //   const dataCopy = data;
  //   console.log(dataCopy);

  //   // Collection.map(dataCopy, (d) => {
  //   //     d[xVarNumber] = Number(new Date(d[xVar]))
  //   // });
  //   return dataCopy;
  // }

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

    const sortedData = this.sortItemsByDate(this.props.data);
    // const processedData = this.processForGraphing(sortedData);
    // console.log(processedData);

    const [yMin, yMax] = this.getMinMax(sortedData);
    const yUnit = '10^9/L'; // to-do add in unit

    return (
      <div className="line-graph" 
        ref={(graphParentDiv) => { this.graphParentDiv = graphParentDiv; }}>

        {/* TO-DO: figure out dates */}
        {/* TO-DO: add in tick marks */}

        <div className="line-graph__header">
          <div className="line-graph__header-title"> {this.props.title} </div>
          <div className="line-graph__header-most-recent"> 
            <span className="line-graph__field"> most recent: </span>
            <span className="line-graph__value"> {this.getMostRecentValue(sortedData)}</span>
          </div>
        </div>
        <LineChart width={this.state.chartWidth} height={this.state.chartHeight} data={sortedData}>
          <Line type="monotone" dataKey="value" stroke="#4a4a4a" />
          <Tooltip content={<CustomGraphTooltip title={this.props.title} unit={yUnit} />} />
          <XAxis dataKey="date" />
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