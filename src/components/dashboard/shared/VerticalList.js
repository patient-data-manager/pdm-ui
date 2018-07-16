import React, { Component } from 'react';
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

    renderViewMore = () => {
        if (this.state.itemDisplayCount < this.props.list.length) {
            return (
                <div>
                    <Button color='primary' onClick={this.viewMore}>
                        <FontAwesomeIcon icon='plus-circle' /> view more
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
                    <div key={i}>{listItem.description} - {listItem.date}</div>
                )}
                {this.renderViewMore()}
            </div>
        );
    }
}

export default VerticalList;