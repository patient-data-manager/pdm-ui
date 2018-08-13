import { fullRenderComponent } from '../../../../utils/testHelpers';
import CustomGraphTooltip from '../../../../components/dashboard/shared/CustomGraphTooltip';
import * as mocks from '../../../../__mocks__/lineGraphMocks';

function setup(payload, active) {
  const props = {
    title: 'title goes here',
    payload: payload,
    active: active,
    unit: 'mL'
  };

  return fullRenderComponent(CustomGraphTooltip, props);
}

it('renders self and self components', () => {
  const component = setup(mocks.tooltipPayloadMockA, true);

  expect(component).toBeDefined();
  expect(component.find(CustomGraphTooltip)).toExist();
  expect(component.find('div.custom-graph-tooltip')).toHaveLength(1);
});

it('it populates the tooltip correctly', () => {
  const component = setup(mocks.tooltipPayloadMockA, true);

  expect(component.find('div.custom-graph-tooltip__field')).toHaveLength(2);
  expect(component.find('div.custom-graph-tooltip__field').at(0).text()).toEqual('Date:  Dec 16, 1977');
  expect(component.find('div.custom-graph-tooltip__field').at(1).text()).toEqual('title goes here:  200 mL');
});

it('tooltip does not exist if there is no payload', () => {
  const component = setup([], true);

  expect(component).toBeDefined();
  expect(component.find(CustomGraphTooltip)).toExist();
  expect(component.find('div.custom-graph-tooltip')).toHaveLength(0);
});

it('tooltip does not exist if there are no details in payload', () => {
  const component = setup(mocks.tooltipPayloadMockB, true);

  expect(component).toBeDefined();
  expect(component.find(CustomGraphTooltip)).toExist();
  expect(component.find('div.custom-graph-tooltip')).toHaveLength(0);
});

it('tooltip does not exist if active is false', () => {
  const component = setup(mocks.tooltipPayloadMockA, false);

  expect(component).toBeDefined();
  expect(component.find(CustomGraphTooltip)).toExist();
  expect(component.find('div.custom-graph-tooltip')).toHaveLength(0);
});
