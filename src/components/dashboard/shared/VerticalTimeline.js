import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';
import memoize from 'memoize-one';

export default class VerticalTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = { displayCount: this.props.initialDisplayCount };
  }

  sortItems = memoize((items) => items.sort(((a, b) => moment(b.date) - moment(a.date))));

  handleViewMore = () => {
    const { items, viewMoreCount } = this.props;
    const { displayCount  } = this.state;
    let newDisplayCount = displayCount + viewMoreCount;
    if (newDisplayCount > items.length) { newDisplayCount = items.length; }

    this.setState({ displayCount: newDisplayCount });
  }

  renderViewMore = () => {
    return (
      <button className="vertical-list__view-more" onClick={this.handleViewMore}>
        <div className="vertical-list__item-icon">
          <Badge badgeContent={<FontAwesomeIcon icon="ellipsis-h" />} color="primary">
            <span></span>
          </Badge>
        </div>

        <div className="vertical-list__view-more-text">View More</div>
      </button>
    );
  }

  render() {
    const { items, icon } = this.props;
    const { displayCount } = this.state;
    const sortedItems = this.sortItems(items);

    return (
      <div className="vertical-timeline">
        {sortedItems.slice(0, displayCount).map((item, index) =>
          <li key={index} className="vertical-list__item">
            <div className="vertical-list__item-icon" >
              <Badge badgeContent={<FontAwesomeIcon icon={icon} />} color="primary">
                <span></span>
              </Badge>
            </div>

            <div className="vertical-list__item-info">
              <div className="vertical-list__item-date">
                {item['date']}
              </div>

              <div className="vertical-list__item-description">
                {item['text']}
              </div>
            </div>

            <div className="vertical-list__item-btn"></div>
          </li>
        )}

        {(sortedItems.length > displayCount) && this.renderViewMore()}
      </div>
    );
  }
}

VerticalTimeline.propTypes = {
  items: PropTypes.array.isRequired,
  icon: PropTypes.string,
  initialDisplayCount: PropTypes.number,
  viewMoreCount: PropTypes.number
};

VerticalTimeline.defaultProps = {
  icon: 'circle',
  initialDisplayCount: 3, // number to initially display
  viewMoreCount: 3        // additional number to display when view more selected
};
