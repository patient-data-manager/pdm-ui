import React, { Component } from 'react';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import Legend from './TimelineLegend';

import 'react-calendar-timeline/lib/lib/Timeline.css';
import 'font-awesome/css/font-awesome.min.css';

export default class PatientTimeline extends Component {

  constructor(props){
    super(props);
    const groups = [{ id: 1, title: 'Clara' }];

    var i = 0;
    let items = [];
    for(i = 0; i < props.patientEvents.length; i++)
    {
      items.push({id: i + 1, group: 1, title: props.patientEvents[i]["Description"], start_time: moment(props.patientEvents[i]["Date"]), end_time: moment(props.patientEvents[i]["Date"]).add(1, 'day'), style: {class: 'fa fa-heartbeat'} })
    }

    //const items = [
      //{ id: 1, group: 1, title: 'CBC - Complete Blood Count', start_time: moment('2018-06-18'), end_time: moment('2018-06-18').add(1, 'day') },
      //{ id: 2, group: 1, title: 'CT of thorax, and pelvis with contrast', start_time: moment("2018-04-01"), end_time: moment('2018-04-01').add(0.5, 'hour') },
      //{ id: 3, group: 1, title: 'CT of abdomen with contrast', start_time: moment('2015-08-04').add(2, 'hour'), end_time: moment('2015-08-04').add(3, 'hour') }

    //];

    // Define the bounds of the timeline
    let visibleTimeStart = moment().clone().add(-2, 'years');
    let visibleTimeEnd = moment().clone().add(3, 'months');
    this.state = {
    items: items,
    groups: groups,
    visibleTimeStart: visibleTimeStart,
    visibleTimeEnd: visibleTimeEnd,
    timeSteps: {
        second: 1,
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
    ]
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
  let visibleTimeStart = moment().clone().add(-5, 'year');
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
          lineHeight={60}
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
