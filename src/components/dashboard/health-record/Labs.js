import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';

export class Labs extends Component {
    render() {
        return(
            <div className='health-record__labs'>
                <VerticalList
                    list={this.labs()}
                    listType='labs'
                    dateProperty='date'
                    descriptionProperty='text'/>
            </div>
        );
    }

    labs(){
      let self = this;
      return this.props.labs.map(function(l){return {date: l.effectiveDateTime , text: self.labDescription(l)}})
    }

    labDescription(lab){
      let text = lab.code.text;
      if(lab.valueQuantity){
        text += " " + lab.valueQuantity.value + " " +lab.valueQuantity.unit
      }
      return text;
    }
}

export default Labs;
