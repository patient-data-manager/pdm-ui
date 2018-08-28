import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProviderCollapsableCard from '../../../../components/dashboard/providers/ProviderCollapsableCard';
import * as mocks from '../../../../__mocks__/providerMocks';

function setup() {
  const props = {
    provider: mocks.providerMockC,
    imageUrl: '/assets/images/provider-logos/partners-healthcare.png'
  };

  return fullRenderComponent(ProviderCollapsableCard, props);
}

it('renders self and self components', () => {
  const component = setup();

  expect(component).toBeDefined();
  expect(component.find('div.provider-card')).toExist();
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toHaveLength(0);
});

it('renders titlebar correctly', () => {
  const component = setup();

  expect(component.find('div.provider-card__titlebar-name')).toExist();
  expect(component.find('div.provider-card__titlebar-name').text()).toEqual('Partners Health Care');
  expect(component.find('div.provider-card__titlebar-icon')).toExist();
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-right');
});

it('renders date details correctly', () => {
  const component = setup();

  component.find('div.provider-card__titlebar-icon').find('svg').simulate('click');
  expect(component.find('div.details-dates')).toExist();
  expect(component.find('div.details-dates-added-on').find('div.date-key').text()).toEqual('Added on');
  expect(component.find('div.details-dates-added-on').find('div.date-value').text()).toEqual('insert date here');
  expect(component.find('div.details-dates-last-updated').find('div.date-key').text()).toEqual('Last updated');
  expect(component.find('div.details-dates-last-updated').find('div.date-value').text()).toEqual('insert date here');
});

it('renders logo correctly', () => {
  const component = setup();

  component.find('div.provider-card__titlebar-icon').find('svg').simulate('click');
  expect(component.find('div.details-logo')).toExist();
  expect(component.find('img.details-logo__img').prop('src'))
    .toEqual('/assets/images/provider-logos/partners-healthcare.png');

});

it('renders permission details correctly', () => {
  const component = setup();
  
  component.find('div.provider-card__titlebar-icon').find('svg').simulate('click');
  expect(component.find('div.details-permissions')).toExist();
  expect(component.find('div.permissions-title')).toExist();
  expect(component.find('div.permissions-content')).toExist();
  expect(component.find('div.permissions-content__label').text()).toEqual('Health Record Access');

  expect(component.find('label.access-radio')).toHaveLength(3);
  expect(component.find('label.access-radio').at(0).find('span').at(3).text()).toEqual('none');
  expect(component.find('label.access-radio').at(1).find('span').at(3).text()).toEqual('full');
  expect(component.find('label.access-radio').at(2).find('span').at(3).text()).toEqual('custom');
});

it('no provider logo is displayed if no imageUrl is given', () => {
  const props = { provider: mocks.providerMockC };
  const component = fullRenderComponent(ProviderCollapsableCard, props);

  component.find('div.provider-card__titlebar-icon').find('svg').simulate('click');
  expect(component.find('div.details-logo')).toHaveLength(0);
});

it('component collapses and expands on click', () => {
  const component = setup();

  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toHaveLength(0);
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-right');

  component.find('div.provider-card__titlebar-icon').find('svg').simulate('click');
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toExist();
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-down');

  component.find('div.provider-card__titlebar-icon').find('svg').simulate('click');
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toHaveLength(0);
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-right');
});