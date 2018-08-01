import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import { groupProps, itemProps } from '../../../prop-types/horizontalTimelineProps';

export default class HorizontalTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTimeStart: moment().add(-1, 'years').valueOf(),
      visibleTimeEnd: moment().add(1, 'months').valueOf()
    };
  }

  renderItem = ({ item }) => {
    return <FontAwesomeIcon icon={item.icon} fixedWidth />;
  }

  renderLegendRow = (item, index) => {
    return (
      <div className="legend-item" key={index}>
        <div className="legend-item__icon"><FontAwesomeIcon icon={item.icon} fixedWidth /></div>
        <div className="lengend-item__text">: {item.text}</div>
      </div>
    );
  }

  renderLegend = (legendItems) => {
    return (
      <div className="horizontal-timeline__legend">
        {legendItems.length > 0 &&
          <div className="legend-item-row legend-item-row__first">
            {legendItems.map((item, index) => {
              if (index % 2 === 0) { return this.renderLegendRow(item, index); }
              return null;
            })}
          </div>
        }

        {legendItems.length > 1 &&
          <div className="legend-item-row legend-item-row__second">
            {legendItems.map((item, index) => {
              if (index % 2 === 1) { return this.renderLegendRow(item, index); }
              return null;
            })}
          </div>
        }
      </div>
    );
  }

  render() {
    const { groups, items, title, legendItems } = this.props;
    const { visibleTimeStart, visibleTimeEnd } = this.state;

    return (
      <div className="horizontal-timeline">
        <div className="horizontal-timeline__title">{title}</div>

        <Timeline
          groups={groups}
          items={items}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          itemRenderer={this.renderItem}
          canMove={false}
          canResize={false}
          canSelect={false}
          canChangeGroup={false}
          sidebarWidth={0}
          lineHeight={40}
        />

        {legendItems && this.renderLegend(legendItems)}

        <ReactTooltip html={true} />
      </div>
    );
  }
}

HorizontalTimeline.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(groupProps).isRequired,
  items: PropTypes.arrayOf(itemProps).isRequired,
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.string
  }))
};
