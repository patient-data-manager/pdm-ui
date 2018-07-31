import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';

import { groupProps, itemProps } from '../../../props/horizontalTimelineProps';

export default class HorizontalTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTimeStart: moment().add(-1, 'years').valueOf(),
      visibleTimeEnd: moment().add(1, 'months').valueOf()
    };
  }

  render() {
    const { groups, items, title } = this.props;
    const { visibleTimeStart, visibleTimeEnd } = this.state;

    return (
      <div className="horizontal-timeline">
        {title}

        <Timeline
          groups={groups}
          items={items}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
        />
      </div>
    );
  }
}

HorizontalTimeline.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(groupProps).isRequired,
  items: PropTypes.arrayOf(itemProps).isRequired
};
