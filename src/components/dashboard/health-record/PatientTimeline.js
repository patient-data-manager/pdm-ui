import React, { Component } from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import Legend from './TimelineLegend';


export default class PatientTimeline extends Component {

  constructor(props){
    super(props);
    const groups = [{ id: 1, title: 'procedure' }, {id: 2, title: 'condition'}, {id: 3, title: 'lab'}, {id: 4, title: 'medication'}];
    let groupHash = {}
    groupHash['Procedure'] = ['fa fa-hospital-o', 1]
    groupHash['Condition'] = ['fa fa-heartbeat', 2]
    groupHash['Lab'] = ['fa fa-flask', 3]
    groupHash['Medication'] = ['fa fa-stethoscope', 4]
    var i = 0;
    let items = [];
    for(i = 0; i < props.patientEvents.length; i++)
    {
      let descriptionTerm = props.patientEvents[i]['description'];
      let endTime = props.patientEvents[i]['enddate'];

      if(endTime === "present")
      {
        endTime = moment().clone();
      }
      else
      {
        endTime = moment(endTime);
      }
      items.push({id: i + 1, group: groupHash[props.patientEvents[i]['type']][1], title: descriptionTerm, start_time: moment(props.patientEvents[i]["startdate"]), end_time: endTime, className: groupHash[props.patientEvents[i]['type']][0], style: {backgroundColor: 'fuschia'}, itemProps: {onClick: () => {alert(descriptionTerm) }}})
    }

    // Define the bounds of the timeline
    let visibleTimeStart = moment().clone().add(-1, 'years');
    let visibleTimeEnd = moment().clone()
    this.state = {
    items: items,
    groups: groups,
    visibleTimeStart: visibleTimeStart,
    visibleTimeEnd: visibleTimeEnd,
    timeSteps: {
        minute: 1,
        hour: 1,
        day: 1,
        month: 1,
        year: 1
    },
    legendItems: [
        {icon: 'hospital-o', description: 'procedure'},
        {icon: 'heartbeat', description: 'condition'},
        {icon: 'flask', description: 'lab'},
        {icon: 'stethoscope', description: 'medication'}
    ],
    hoverItem: {
    title: '',
    details: '',
    style: {top: 0, left: 0, display: 'none'}
}
  };
  this.oneMonth = this.oneMonth.bind(this)
  this.threeMonth = this.threeMonth.bind(this)
  this.sixMonth = this.sixMonth.bind(this)
  this.oneYear = this.oneYear.bind(this)
  this.fiveYear = this.fiveYear.bind(this)
  this.beginning = this.beginning.bind(this)
}

oneMonth(num) {
  let visibleTimeStart = moment().clone().add(-1, 'months');
  let visibleTimeEnd = moment().clone()
  this.setState({
  visibleTimeStart: visibleTimeStart,
  visibleTimeEnd: visibleTimeEnd
})
}

threeMonth() {
  let visibleTimeStart = moment().clone().add(-3, 'months');
  let visibleTimeEnd = moment().clone()
  this.setState({
  visibleTimeStart: visibleTimeStart,
  visibleTimeEnd: visibleTimeEnd
})
}

sixMonth() {
  let visibleTimeStart = moment().clone().add(-6, 'months');
  let visibleTimeEnd = moment().clone()
  this.setState({
  visibleTimeStart: visibleTimeStart,
  visibleTimeEnd: visibleTimeEnd
})
}

oneYear() {
  let visibleTimeStart = moment().clone().add(-1, 'year');
  let visibleTimeEnd = moment().clone()
  this.setState({
  visibleTimeStart: visibleTimeStart,
  visibleTimeEnd: visibleTimeEnd
})
}

fiveYear() {
  let visibleTimeStart = moment().clone().add(-5, 'year')
  let visibleTimeEnd = moment().clone()
  this.setState({
  visibleTimeStart: visibleTimeStart,
  visibleTimeEnd: visibleTimeEnd
})
}

beginning() {
  let items = this.state.items
  if(items.length === 0)
  {
    this.setState({
      visibleTimeStart: moment().clone().add(-1, 'week'),
      visibleTimeEnd: moment().clone()
    })
  }
  else
  {
    var k = 0
    let all_times = []
    for(k = 0; k < items.length; k++)
    {
      all_times.push(items[k]["start_time"])
    }
    let visibleTimeStart = moment.min(all_times)
    let visibleTimeEnd = moment().clone()
    this.setState({
    visibleTimeStart: visibleTimeStart,
    visibleTimeEnd: visibleTimeEnd
  })
}
}

// Create a set of groups that match those used by the items.
createGroupsForItems = (numGroups) => {
    // extract the group IDs
    let groups = [];

    for (let i = 0; i < numGroups; i++) {
        groups.push({id: i+1});
    }

    return groups;
}

getMaxGroup = (items) => {
    let max = 1;

    items.forEach((item) => {
        if (item.group > max) {
            max = item.group;
        }
    });

    return max;
}
  render() {
    return (
      <div>
      <div align="right">
      <button onClick={this.oneMonth}>
      1mo
      </button>

      <button onClick={this.threeMonth}>
      3mo
      </button>

      <button onClick={this.sixMonth}>
      6mo
      </button>

      <button onClick={this.oneYear}>
      1yr
      </button>

      <button onClick={this.fiveYear}>
      5yr
      </button>
      <button onClick={this.beginning}>
      All
      </button>
      </div>
        <Timeline
          groups={this.state.groups}
          items={this.state.items}
          visibleTimeStart={this.state.visibleTimeStart}
          visibleTimeEnd={this.state.visibleTimeEnd}
          rightSidebarWidth={0}
          rightSidebarContent={null}
          sidebarWidth={0}
          sidebarContent={null}
          timeSteps={this.state.timeSteps}
          lineHeight={40}
          lineWidth={40}
          itemHeightRatio={0.7}
          canMove={false}
          canResize={false}
          canSelect={false}
        />
        <Legend
        items={this.state.legendItems}
        />
      </div>
    );
  }
}
