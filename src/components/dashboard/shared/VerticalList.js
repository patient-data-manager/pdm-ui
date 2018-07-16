import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

export class VerticalList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            itemDisplayCount: 3
        };
    }

    viewMore = () => {
        let newDisplayCount = this.state.itemDisplayCount + 3;
        if (newDisplayCount > this.props.list.length) {
            this.setState({ itemDisplayCount: this.props.list.length });
        }
        this.setState({ itemDisplayCount: newDisplayCount });
    }
    
    renderListIcon = () => {
        let icon;
        if (this.props.listType === 'procedures') {
            icon = <FontAwesomeIcon icon='hospital' />;
        } else if (this.props.listType === 'conditions') {
            icon = <FontAwesome name='heartbeat' />;
        } else if (this.props.listType === 'labs') {
            icon = <FontAwesome name='flask' />;
        } else if (this.props.listType === 'medications') {
            // TO-DO: find pill icon
            icon = <FontAwesomeIcon icon={'pills'} />;
        } else {
            icon = <FontAwesomeIcon icon='circle' />;
        }
        return (icon);
    }

    renderViewMore = () => {
        if (this.state.itemDisplayCount < this.props.list.length) {
            return (
                <div>
                    <Button color='primary' className='vertical-list__view-more' onClick={this.viewMore}>
                        <FontAwesome name='ellipsis-h' />
                        <span> view more </span>
                    </Button>
                </div>
            );
        }
        return ('');
    }

    render() {
        return(
            <div>
                {this.props.list.slice(0, this.state.itemDisplayCount).map((listItem, i) => 
                    <div key={i} className='vertical-list__item'>
                        <div className='vertical-list__item-icon'>
                            {this.renderListIcon()}
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
                    </div>
                )}
                {this.renderViewMore()}
            </div>
        );
    }
}

export default VerticalList;