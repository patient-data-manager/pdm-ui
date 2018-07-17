import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';


export class Immunizations extends Component {
    render() {
        return(
            <div className='health-record__medications'>
                <VerticalList
                    list={this.immunizations()}
                    listType='medications'
                    dateProperty='date'
                    descriptionProperty='text'/>
            </div>
        );
    }

    immunizations(){
      return this.props.immunizations.map(function(i){return {date: i.date, text: i.vaccineCode.text}});
    }
}

export default Immunizations;
