import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline/lib';
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import _ from 'lodash';
import isValid from '../../../utils/isValid';

import { groupProps, itemProps, legendProps, rangeProps } from '../../../prop-types/horizontalTimelineProps';

export default class HorizontalTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTimeStart: null,
      visibleTimeEnd: null,
      activeRange: null
    };
  }

  componentWillMount() {
    this.initializeRange();
  }

  initializeRange() {
    const { rangeItems, defaultRange } = this.props;
    if (!isValid(rangeItems)) return;
    const rangeItem = rangeItems.filter((item) => item.rangeText === defaultRange)[0];
    if (!isValid(rangeItem)) return;
    this.handleChangeTimeRange(defaultRange, rangeItem.rangeNum, rangeItem.rangeType, rangeItem.rangeFutureType);
  }

  handleShowAll() {
    const { items } = this.props;
    if (items.length === 0) this.handleChangeTimeRange('1yr');
    const allStartTimes = items.map((item) => item.start_time);
    const minStartTime = Math.min(...allStartTimes);
    const maxStartTime = Math.max(...allStartTimes);

    this.setState({
      visibleTimeStart: moment(minStartTime).add(-1, 'year').valueOf(),
      visibleTimeEnd: moment(maxStartTime).add(1, 'year').valueOf(),
      activeRange: 'all'
    });
  }

  handleChangeTimeRange = (rangeText) => {
    if (rangeText === 'all') {
      this.handleShowAll();
      return;
    }

    const item = this.props.rangeItems.filter((item) => item.rangeText === rangeText)[0];

    this.setState({
      visibleTimeStart: moment().add(-item.rangeNum, item.rangeType).valueOf(),
      visibleTimeEnd: moment().add(1, item.rangeFutureType).valueOf(),
      activeRange: item.rangeText
    });
  }

  renderItem = ({ item }) => {
    return (
      <div data-for={`item-${item.id}`} data-tip={item.hoverElement}>
        <FontAwesomeIcon icon={item.icon} fixedWidth /> {item.title}
        <ReactTooltip html={true} id={`item-${item.id}`} className="horizontal-timeline__tooltip" type="light" />
      </div>
    );
  }

  renderLegendRow = (legendItems, indexCheck) => {
    return (
      <div className="legend-item-row">
        {legendItems.map((item, index) => {
          if (index % 2 === indexCheck) {
            return (
              <div className="legend-item" key={index}>
                <div className="legend-item__icon"><FontAwesomeIcon icon={item.icon} fixedWidth /></div>
                <div className="legend-item__text">: {item.text}</div>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  }

  renderLegend = (legendItems) => {
    if (legendItems.length === 0) return null;

    return (
      <div className="horizontal-timeline__legend">
        {legendItems.length > 0 && this.renderLegendRow(legendItems, 0)}
        {legendItems.length > 1 && this.renderLegendRow(legendItems, 1)}
      </div>
    );
  }

  render() {
    const { groups, items, title, legendItems, rangeItems, stackItems, chartWidth } = this.props;
    const { visibleTimeStart, visibleTimeEnd, activeRange } = this.state;
    const graphWidthStyle = { width: `${chartWidth}px` };

    if (items.length < 1) return null;

    return (
      <div className="horizontal-timeline" style={graphWidthStyle}>
        <div className="horizontal-timeline__header">
          <h5 id={_.lowerCase(title)}>{title}</h5>

          <div className="header-buttons">
            {rangeItems && rangeItems.map((item, index) => {
              const buttonClass = classNames('timeline-button', { 'active': activeRange === item.rangeText });

              return (
                <button key={index} className={buttonClass} onClick={() => this.handleChangeTimeRange(item.rangeText)}>
                  {item.rangeText}
                </button>
              );
            })}
          </div>
        </div>

        <Timeline
          groups={groups}
          items={items}
          defaultTimeEnd={moment().add(3, 'months')} // TODO: not working
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          itemRenderer={this.renderItem}
          canMove={false}
          canResize={false}
          canSelect={false}
          canChangeGroup={false}
          stackItems={stackItems}
          stickyHeader={false} // TODO: not working
          sidebarWidth={0}
          lineHeight={40}
          resizeDetector={containerResizeDetector}
          minZoom={60 * 60 * 1000 * 24} // 1 day
          maxZoom={150 * 365.24 * 86400 * 1000} // 150 years
        />

        <div className="horizontal-timeline__footer">
          {legendItems && this.renderLegend(legendItems)}
          <div className="footer-text">zoom in/out, click and drag, or choose a button above</div>
        </div>
      </div>
    );
  }
}

HorizontalTimeline.propTypes = {
  title: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(groupProps).isRequired,
  items: PropTypes.arrayOf(itemProps).isRequired,
  legendItems: PropTypes.arrayOf(legendProps),
  rangeItems: PropTypes.arrayOf(rangeProps),
  defaultRange: PropTypes.string, // a rangeText from rangeItems
  stackItems: PropTypes.bool,
  chartWidth: PropTypes.number
};

HorizontalTimeline.defaultProps = {
  legendItems: [],
  rangeItems: [
    { rangeText: '1mo', rangeNum: 1, rangeType: 'months', rangeFutureType: 'days' },
    { rangeText: '3mo', rangeNum: 3, rangeType: 'months', rangeFutureType: 'days' },
    { rangeText: '6mo', rangeNum: 6, rangeType: 'months', rangeFutureType: 'months' },
    { rangeText: '1yr', rangeNum: 1, rangeType: 'year', rangeFutureType: 'months' },
    { rangeText: '5yr', rangeNum: 5, rangeType: 'year', rangeFutureType: 'months' },
    { rangeText: 'all' }
  ],
  defaultRange: '1yr',
  stackItems: false,
  chartWidth: 600
};
