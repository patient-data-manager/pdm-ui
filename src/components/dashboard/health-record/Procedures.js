import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

export class Procedures extends Component {

    render() {
        return(
            <div className='health-record__procedures'>
                <VerticalList
                    list={this.procedures()}
                    listType='procedures'
                    dateProperty='date'
                    descriptionProperty='text'/>
            </div>
        );
    }

    procedures(){
      return this.props.procedures.map(function(p){return {date: p.performedDateTime, text: p.code.text}})
    }
}

export default Procedures;
