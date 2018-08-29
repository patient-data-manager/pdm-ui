import { fullRenderComponent } from '../../../../utils/testHelpers';
import LineGraph from '../../../../components/dashboard/shared/LineGraph';
import { LineChart } from 'recharts';
import * as mocks from '../../../../__mocks__/lineGraphMocks';

function setup() {
  const props = {
    title: 'title goes here',
    data: [
      mocks.graphDataMockA,
      mocks.graphDataMockB,
      mocks.graphDataMockC,
      mocks.graphDataMockD,
      mocks.graphDataMockE,
      mocks.graphDataMockF,
      mocks.graphDataMockG
    ],
    referenceRanges: mocks.referenceRangesMock,
    minPoints: 3,
    unit: '10^9/L'
  };

  return fullRenderComponent(LineGraph, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.line-graph__header')).toExist();
  expect(component.find(LineChart)).toExist();
});

it('displays title and most recent values correctly', () => {
  const component = setup();

  expect(component.find('h5')).toExist();
  expect(component.find('h5').text()).toEqual('title goes here');
  expect(component.find('div.line-graph__header-most-recent')).toExist();
  expect(component.find('div.line-graph__header-most-recent').text()).toEqual('most recent: 100');
});

it('displays the graph correctly', () => {
  const component = setup();
  
  expect(component.find(LineChart)).toExist();
  expect(component.find(LineChart).prop('data')).toHaveLength(7);
  expect(component.find(LineChart).prop('data')[0]).toEqual({ value: 200, date: 251149251000 });
  expect(component.find(LineChart).prop('data')[1]).toEqual({ value: 400, date: 408915651000 });
  expect(component.find(LineChart).prop('data')[2]).toEqual({ value: 50, date: 913837251000 });
  expect(component.find(LineChart).prop('data')[3]).toEqual({ value: 500, date: 1008531651000 });
  expect(component.find(LineChart).prop('data')[4]).toEqual({ value: 250, date: 1087414851000 });
  expect(component.find(LineChart).prop('data')[5]).toEqual({ value: 300, date: 1260992451000 });
  expect(component.find(LineChart).prop('data')[6]).toEqual({ value: 100, date: 1513453251000 });
  expect(component.find('Line')).toExist();

  expect(component.find('svg.recharts-surface').prop('height')).toEqual(200);
  expect(component.find('svg.recharts-surface').prop('width')).toEqual(674);
  expect(component.find('g.recharts-layer')).toExist();
  expect(component.find('div.recharts-tooltip-wrapper')).toExist();
});

it('displays axis correctly', () => {
  const component = setup();

  expect(component.find('g.recharts-xAxis').find('text.recharts-cartesian-axis-tick-value')).toHaveLength(4);
  expect(component.find('g.recharts-yAxis').find('text.recharts-cartesian-axis-tick-value')).toHaveLength(4);
  expect(component.find('g.recharts-xAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(0).text()).toEqual(`Jan '80`);
  expect(component.find('g.recharts-xAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(1).text()).toEqual(`Jan '90`);
  expect(component.find('g.recharts-xAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(2).text()).toEqual(`Jan '00`);
  expect(component.find('g.recharts-xAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(3).text()).toEqual(`Jan '10`);
  expect(component.find('g.recharts-yAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(0).text()).toEqual('45');
  expect(component.find('g.recharts-yAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(1).text()).toEqual('195');
  expect(component.find('g.recharts-yAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(2).text()).toEqual('345');
  expect(component.find('g.recharts-yAxis')
    .find('text.recharts-cartesian-axis-tick-value').at(3).text()).toEqual('550');
});

it('displays reference ranges correctly', () => {
  const component = setup();

  expect(component.find('g.recharts-reference-area')).toHaveLength(3);
  expect(component.find('g.recharts-reference-area').at(0).find('path').prop('fill')).toEqual('#d08c9f');
  expect(component.find('g.recharts-reference-area').at(1).find('path').prop('fill')).toEqual('#e7eaee');
  expect(component.find('g.recharts-reference-area').at(2).find('path').prop('fill')).toEqual('#eddadf');
  expect(component.find('g.recharts-reference-area').at(0).find('path').prop('height')).toEqual(31.683168316831683);
  expect(component.find('g.recharts-reference-area').at(1).find('path').prop('height')).toEqual(109.30693069306932);
  expect(component.find('g.recharts-reference-area').at(2).find('path').prop('height')).toEqual(19.009900990099);
});

it('graph is not displayed if data.length is less than minPoints', () => {
  const component = fullRenderComponent(LineGraph,
    { title: 'title', minPoints: 4, data: [mocks.graphDataMockA, mocks.graphDataMockB], unit: '10^9/L' });

  expect(component).toBeDefined();
  expect(component.find('div.line-graph__header')).toHaveLength(0);
  expect(component.find(LineChart)).toHaveLength(0);
});
