import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import memoize from 'memoize-one';
import classNames from 'classnames';

export default class VerticalTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = { displayCount: this.props.initialDisplayCount };
  }

  // memoize will only call the function if items has changed, otherwise it will return the last value
  sortItems = memoize((items) => items.sort(((a, b) => moment(b.date) - moment(a.date))));

  handleViewMore = () => {
    const { items, viewCount } = this.props;
    const { displayCount  } = this.state;
    let newDisplayCount = displayCount + viewCount;
    if (newDisplayCount > items.length) { newDisplayCount = items.length; }

    this.setState({ displayCount: newDisplayCount });
  }

  handleViewLess = () => {
    const { initialDisplayCount, viewCount } = this.props;
    const { displayCount  } = this.state;
    let newDisplayCount = displayCount - viewCount;
    if (newDisplayCount <= viewCount) { newDisplayCount = initialDisplayCount; }

    this.setState({ displayCount: newDisplayCount });
  }

  renderViewMore = () => {
    return (
      <button className="vertical-timeline__view-more" onClick={this.handleViewMore}>
        <FontAwesomeIcon icon="ellipsis-h" className="icon-health-record" />
        <div className="vertical-timeline__view-more-text">View More</div>
      </button>
    );
  }

  renderViewLess = (showViewMore) => {
    return (
      <button className="vertical-timeline__view-less" onClick={this.handleViewLess}>
        {showViewMore && <span className="view-less-slash">/</span>}
        {!showViewMore && <FontAwesomeIcon icon="ellipsis-h" className="icon-health-record" />}
        <div className="vertical-timeline__view-less-text">View Less</div>
      </button>
    );
  }

  renderItem = (item, index) => {
    const { items, icon } = this.props;
    const itemClassname = classNames('vertical-timeline__item', { 'last-item': index + 1 === items.length });

    return (
      <div key={index} className={itemClassname}>
        <FontAwesomeIcon icon={icon} className="icon-health-record" />

        <div className="vertical-timeline__item-info">
          <div className="info-date">{moment(item.date).format('MMM D, YYYY')}</div>
          <div className="info-description">{item.text}</div>
        </div>
      </div>
    );
  }

  render() {
    const { items, initialDisplayCount, viewCount } = this.props;
    const { displayCount } = this.state;
    const sortedItems = this.sortItems(items);

    return (
      <div className="vertical-timeline">
        {sortedItems.slice(0, displayCount).map((item, index) => this.renderItem(item, index))}

        <p className="vertical-timeline__view-more-less">
          {(sortedItems.length > displayCount) && this.renderViewMore()}
          {(displayCount > initialDisplayCount) && this.renderViewLess(sortedItems.length > displayCount)}
        </p>
      </div>
    );
  }
}

VerticalTimeline.propTypes = {
  items: PropTypes.array.isRequired,
  icon: PropTypes.string,
  initialDisplayCount: PropTypes.number,
  viewCount: PropTypes.number
};

VerticalTimeline.defaultProps = {
  icon: 'circle',
  initialDisplayCount: 3, // number to initially display
  viewCount: 3            // +/- number to display when view more or less is selected
};
