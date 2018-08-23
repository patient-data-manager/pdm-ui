const groupsMock = [
  { 'id': 1, 'title': 'procedure' },
  { 'id': 2, 'title': 'condition' },
  { 'id': 3, 'title': 'lab' },
  { 'id': 4, 'title': 'medication' }
];

const itemsMock = [
  {
    className: 'timeline-item theme-dark', 
    end_time: 1531753740000,
    group: 1,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Aug 21st 2018, 1:15 pm↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>procedure</div>↵        <div class="hover-element__text">Documentation of current medications</div>↵      </div>`,
    icon: 'hospital',
    id: 'procedure1',
    start_time: 1531753740000,
    title: 'Documentation of current medications'
  },
  {
    className: 'timeline-item theme-dark', 
    end_time: 1211288940000,
    group: 1,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Oct 3rd 2009, 10:34 am↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>procedure</div>↵        <div class="hover-element__text">Colonoscopy</div>↵      </div>`,
    icon: 'hospital',
    id: 'procedure2',
    start_time: 1211296140000,
    title: 'Colonoscopy'
  },
  { 
    className: 'timeline-item theme-dark', 
    end_time: 1217747083000,
    group: 2,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Aug 2nd 2008, 3:04 am↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>condition</div>↵        <div class="hover-element__text">Viral sinusitis (disorder)</div>↵      </div>`,
    icon: 'heartbeat',
    id: 'condition3',
    start_time: 1217660683000,
    title: 'Viral sinusitis (disorder)'
  },
  {
    className: 'timeline-item theme-dark', 
    end_time: 1050678540000,
    group: 2,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Jun 24th 1939, 11:30 am↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>condition</div>↵        <div class="hover-element__text">Perennial allergic rhinitis</div>↵      </div>`,
    icon: 'heartbeat',
    id: 'condition4',
    start_time: 1050505740000,
    title: 'Perennial allergic rhinitis'
  },
  { 
    className: 'timeline-item theme-dark', 
    end_time: 819904140000,
    group: 3,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Sep 3rd 2011, 6:19 pm↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>lab</div>↵        <div class="hover-element__text">Triglycerides</div>↵      </div>`,
    icon: 'flask',
    id: 'lab5',
    start_time: 818608140000,
    title: 'Triglycerides'
  },
  { 
    className: 'timeline-item theme-dark', 
    end_time: 1345174762000,
    group: 3,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Sep 3rd 2011, 6:19 pm↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>lab</div>↵        <div class="hover-element__text">Triglycerides</div>↵      </div>`,
    icon: 'flask',
    id: 'lab6',
    start_time: 1345988362000,
    title: 'Low Density Lipoprotein Cholesterol'
  },
  {
    className: 'timeline-item theme-dark', 
    end_time: 1492355340000,
    group: 4,
    hoverElement: `<div class="hover-element" data-html=true>↵        <div class="hover-element__date">↵          <span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-reactroot=""><path fill="currentColor" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg></span>Jun 30th 2011, 3:40 pm↵        </div>↵↵        <div class="hover-element__group"><span class="hover-element__label"><svg aria-hidden="true" data-prefix="fas" data-icon="notes-medical" class="svg-inline--fa fa-notes-medical fa-w-12 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-reactroot=""><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm96 304c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm0-192c0 4.4-3.6 8-8 8H104c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16z"></path></svg></span>medication</div>↵        <div class="hover-element__text">Camila 28 Day Pack</div>↵      </div>`,
    icon: 'pills',
    id: 'medication7',
    start_time: 1492355340000,
    title: 'Camila 28 Day Pack'
  }
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
  { rangeText: '3yr', rangeNum: 3, rangeType: 'year', rangeFutureType: 'months' },
  { rangeText: '10yr', rangeNum: 10, rangeType: 'year', rangeFutureType: 'months' },
  { rangeText: 'all' }
];

export {
  groupsMock,
  itemsMock,
  legendItemsMock,
  rangeItemsMock
};