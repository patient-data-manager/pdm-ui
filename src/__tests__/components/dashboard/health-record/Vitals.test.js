import { fullRenderComponent } from '../../../../utils/testHelpers';
import Vitals from '../../../../components/dashboard/health-record/Vitals';
import * as mocks from '../../../../__mocks__/vitalMocks';

function setup() {
  const props = {
    vitals: [
      mocks.vitalMockA,
      mocks.vitalMockB,
      mocks.vitalMockC,
      mocks.vitalMockD,
      mocks.vitalMockE,
      mocks.vitalMockF,
      mocks.vitalMockG,
      mocks.vitalMockH,
      mocks.vitalMockI
    ]
  };
  return fullRenderComponent(Vitals, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.vitals')).toExist();
  expect(component.find('div.vertical-timeline')).toExist();
  expect(component.find('div.no-entries')).toHaveLength(0);
});

it('it renders and filters the vital results as a vertical timeline correctly', () => {
  const component = setup();
  expect(component.find('div.vertical-timeline__item')).toHaveLength(3);
  expect(component.find('div.vertical-timeline__item-info').at(0)
    .find('.info-description').text()).toEqual('Systolic Blood Pressure 101.51 mmHg');
  expect(component.find('div.vertical-timeline__item-info').at(1)
    .find('.info-description').text()).toEqual('Diastolic Blood Pressure 70.91 mmHg');
  expect(component.find('div.vertical-timeline__item-info').at(2)
    .find('.info-description').text()).toEqual('Body Weight 96.45 kg');
});

it('groups and displays vital values as graphs', () => {
  const component = setup();

  expect(component.find('div.recharts-wrapper')).toHaveLength(1);
  expect(component.find('div.line-graph').at(0)
    .find('div.line-graph__header').find('h5').text())
    .toEqual('Body Mass Index (kg/m2)');
});

it('groups vitals correctly', () => {
  const vital = new Vitals({
    vitals: [
      mocks.vitalMockA,
      mocks.vitalMockB,
      mocks.vitalMockC,
      mocks.vitalMockD,
      mocks.vitalMockE,
      mocks.vitalMockF,
      mocks.vitalMockG,
      mocks.vitalMockH,
      mocks.vitalMockI
    ]
  });
  const grouped = vital.groupVitals();

  expect(grouped['364075005'].values).toHaveLength(2);
  expect(grouped['8331-1'].values).toHaveLength(1);
  expect(grouped['8302-2'].values).toHaveLength(1);
  expect(grouped['29463-7'].values).toHaveLength(1);
  expect(grouped['39156-5'].values).toHaveLength(3);
  expect(grouped['364075005'].title).toEqual('Heart rate (observable) (bpm)');
  expect(grouped['8331-1'].title).toEqual('Oral Temperature (Cel)');
  expect(grouped['8302-2'].title).toEqual('Body Height (cm)');
  expect(grouped['29463-7'].title).toEqual('Body Weight (kg)');
  expect(grouped['39156-5'].title).toEqual('Body Mass Index (kg/m2)');
});

it('displays no entries message if no vital entries are present', () => {
  const component = fullRenderComponent(Vitals, { vitals: [] });

  expect(component.find('div.no-entries')).toExist();
  expect(component.find('div.vertical-timeline')).toHaveLength(0);
});
