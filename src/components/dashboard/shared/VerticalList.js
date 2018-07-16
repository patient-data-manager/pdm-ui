import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';

export class VerticalList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listItems: this.sortList(this.props.list),
            itemDisplayCount: 3
        };
    }

    sortList = (list) => {
        list.sort(((a,b) => moment(b.date) - moment(a.date)));
        return list;
    }

    viewMore = () => {
        let newDisplayCount = this.state.itemDisplayCount + 3;
        if (newDisplayCount > this.props.list.length) {
            this.setState({ itemDisplayCount: this.props.list.length });
        }
        this.setState({ itemDisplayCount: newDisplayCount });
    }

    renderViewMoreIcon = () => {
        return (<FontAwesome name='ellipsis-h' />);
    }
    
    renderListIcon = () => {
        let icon = '';
        if (this.props.listType === 'procedures') {
            icon = <FontAwesomeIcon icon='hospital' />;
        } else if (this.props.listType === 'conditions') {
            icon = <FontAwesome name='heartbeat' />;
        } else if (this.props.listType === 'labs') {
            icon = <FontAwesome name='flask' />;
        // TO-DO: find pill icon
        // } else if (this.props.listType === 'medications') {
        //     icon = <FontAwesomeIcon icon={'pills'} />;
        }
        return (icon);
    }

    renderViewMore = () => {
        if (this.state.itemDisplayCount < this.props.list.length) {
            return (
                <div className='vertical-list__view-more' onClick={this.viewMore}>
                    <div className='vertical-list__item-icon'>
                        <Badge badgeContent={this.renderViewMoreIcon()} color='primary'> 
                            <span></span>
                        </Badge>
                    </div>
                    <div className='vertical-list__'>View More</div>
                </div>
            );
        }
        return ('');
    }

    render() {
        return(
            <div className='vertical-timeline'>
                {this.props.list.slice(0, this.state.itemDisplayCount).map((listItem, i) => 
                    <li key={i} className='vertical-list__item'>
                        <div className='vertical-list__item-icon' >
                            <Badge badgeContent={this.renderListIcon()} color='primary'> 
                                <span></span>
                            </Badge>
                        </div>
                        <div className='vertical-list__item-info'>
                            <div className='vertical-list__item-date'>
                                {listItem.date}
                            </div>
                            <div className='vertical-list__item-description'>
                                {listItem.description} 
                            </div>
                        </div>
                        <div className='vertical-list__item-btn'></div>
                    </li>
                )}
                {this.renderViewMore()}
            </div>
        );
    }
}

export default VerticalList;