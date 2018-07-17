import React, { Component } from 'react';
import VerticalList from '../shared/VerticalList';


export class VitalSigns extends Component {
    render() {
        return(
            <div className='health-record__labs'>
                <VerticalList
                    list={this.vitals()}
                    listType='labs'
                    dateProperty='date'
                    descriptionProperty='text'/>
            </div>
        );
    }

    vitals(){
      let self = this;
      return this.props.labs.map(function(l){return {date: l.effectiveDateTime , text: self.vitalsDescription(l)}})
    }

    vitalsDescription(vitalSign){
      let text = vitalSign.code.text;
      if(vitalSign.valueQuantity){
        text += " " + vitalSign.valueQuantity.value + " " +vitalSign.valueQuantity.unit
      }
      return text;
    }
}

export default VitalSigns;
