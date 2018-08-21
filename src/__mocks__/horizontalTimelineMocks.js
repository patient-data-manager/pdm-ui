const groupsMock = [
  { 'id': 1, 'title': 'procedure' },
  { 'id': 2, 'title': 'condition' },
  { 'id': 3, 'title': 'lab' },
  { 'id': 4, 'title': 'medication' }
];

const itemsMock = [
  { 
    className: 'timeline-item theme-dark', 
    end_time: 1315174762000,
    group: 3,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Sep 3rd 2011, 6:19 pm↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>lab</div>↵        <div class="hover-element__text">Triglycerides</div>↵      </div>`,
    icon: 'flask',
    id: 'lab3218',
    start_time: 1315088362000,
    title: 'Triglycerides'
  }

  // TO-DO add more
];

const legendItemsMock =[
  { icon: 'hospital', text: 'procedure' },
  { icon: 'heartbeat', text: 'condition' },
  { icon: 'flask', text: 'lab' },
  { icon: 'pills', text: 'medication' }
];

const rangeItemsMock = [
  { rangeText: '1mo', rangeNum: 1, rangeType: 'months', rangeFutureType: 'days' },
  { rangeText: '3mo', rangeNum: 3, rangeType: 'months', rangeFutureType: 'days' },
  { rangeText: '6mo', rangeNum: 6, rangeType: 'months', rangeFutureType: 'months' },
  { rangeText: '1yr', rangeNum: 1, rangeType: 'year', rangeFutureType: 'months' },
  { rangeText: '5yr', rangeNum: 5, rangeType: 'year', rangeFutureType: 'months' },
  { rangeText: 'all' }
];

export {
  groupsMock,
  itemsMock,
  legendItemsMock,
  rangeItemsMock
};