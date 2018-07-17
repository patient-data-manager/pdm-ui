import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

export class Conditions extends Component {
    render() {
        return(
            <div className='health-record__conditions'>
                <VerticalList
                    list={this.conditions()}
                    listType='conditions'
                    dateProperty='date'
                    descriptionProperty='text'/>
            </div>
        );
    }

    conditions(){
      return this.props.conditions.map( function(c){ return {date: c.onsetDateTime , text: c.code.text}});
    }
}

export default Conditions;
