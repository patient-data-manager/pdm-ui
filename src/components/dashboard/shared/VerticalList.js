import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';

export default class VerticalList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: this.sortList(this.props.list),
      itemDisplayCount: 3
    };
  }

  sortList = (list) => {
    return list.sort(((a, b) => moment(b[this.props.dateProperty]) - moment(a[this.props.dateProperty])));
  }

  viewMore = () => {
    let newDisplayCount = this.state.itemDisplayCount + 3;

    if (newDisplayCount > this.state.listItems.length) {
      this.setState({ itemDisplayCount: this.state.listItems.length });
    }

    this.setState({ itemDisplayCount: newDisplayCount });
  }

  renderViewMoreIcon = () => {
    return <FontAwesomeIcon icon="ellipsis-h" />;
  }

  renderListIcon = () => {
    let icon = '';

    if (this.props.listType === 'procedures') {
      icon = <FontAwesomeIcon icon="hospital" />;
    } else if (this.props.listType === 'conditions') {
      icon = <FontAwesomeIcon icon="heartbeat" />;
    } else if (this.props.listType === 'labs') {
      icon = <FontAwesomeIcon icon="flask" />;
    } else if (this.props.listType === 'medications') {
      icon = <FontAwesomeIcon icon="pills" />;
    }

    return (icon);
  }

  renderViewMore = () => {
    if (this.state.itemDisplayCount < this.state.listItems.length) {
      return (
        <button className="vertical-list__view-more" onClick={this.viewMore}>
          <div className="vertical-list__item-icon">
            <Badge badgeContent={this.renderViewMoreIcon()} color="primary">
              <span></span>
            </Badge>
          </div>

          <div className="vertical-list__view-more-text">View More</div>
        </button>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="vertical-timeline">
        {this.state.listItems.slice(0, this.state.itemDisplayCount).map((listItem, i) =>
          <li key={i} className="vertical-list__item">
            <div className="vertical-list__item-icon" >
              <Badge badgeContent={this.renderListIcon()} color="primary">
                <span></span>
              </Badge>
            </div>

            <div className="vertical-list__item-info">
              <div className="vertical-list__item-date">
                {listItem[this.props.dateProperty]}
              </div>

              <div className="vertical-list__item-description">
                {listItem[this.props.descriptionProperty]}
              </div>
            </div>

            <div className="vertical-list__item-btn"></div>
          </li>
        )}

        {this.renderViewMore()}
      </div>
    );
  }
}
