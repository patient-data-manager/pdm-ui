import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProviderCard from '../../../../components/dashboard/providers/ProviderCard';
import * as mocks from '../../../../__mocks__/providerMocks';

function setup(provider) {
  const props = { provider };

  return fullRenderComponent(ProviderCard, props);
}

it('renders self and self components', () => {
  const component = setup(mocks.providerMockE);

  expect(component).toBeDefined();
  expect(component.find('div.provider-card')).toExist();
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toExist();
});

it('renders titlebar correctly', () => {
  const component = setup(mocks.providerMockE);

  expect(component.find('div.provider-card__titlebar-name')).toExist();
  expect(component.find('div.provider-card__titlebar-name').text()).toEqual('Anne Arundel Medical Center');
  expect(component.find('div.provider-card__titlebar-icon')).toExist();
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-down');
});

it('renders date details correctly', () => {
  const component = setup(mocks.providerMockC);

  expect(component.find('div.details-info')).toExist();
  expect(component.find('div.details-info__added-on').find('div.date-key').text()).toEqual('Added on');
  expect(component.find('div.details-info__added-on').find('div.date-value').text()).toEqual('2001-09-16');
  expect(component.find('div.details-info__last-updated').find('div.date-key').text()).toEqual('Last updated');
  expect(component.find('div.details-info__last-updated').find('div.date-value').text()).toEqual('2018-04-05');
});

it('does not display date details if field values not defined', () => {
  const component = setup(mocks.providerMockE);

  expect(component.find('div.details-info')).toExist();
  expect(component.find('div.details-info__added-on').find('div.date-key').text()).toEqual('Added on');
  expect(component.find('div.details-info__added-on').find('div.date-value').text()).toEqual('');
  expect(component.find('div.details-info__last-updated').find('div.date-key').text()).toEqual('Last updated');
  expect(component.find('div.details-info__last-updated').find('div.date-value').text()).toEqual('');
});

// add address field tests here

it('renders logo correctly', () => {
  const component = setup(mocks.providerMockE);

  expect(component.find('div.details-logo')).toExist();
  expect(component.find('img.details-logo__img').prop('src'))
    .toEqual('data:image/jpeg;base64,' + mocks.providerMockE.logo);
});

it('no provider logo is displayed if no imageUrl is given', () => {
  const component = setup(mocks.providerMockC);
  expect(component.find('div.details-logo')).toHaveLength(0);
});

it('renders permission details correctly', () => {
  const component = setup(mocks.providerMockE);

  expect(component.find('div.details-permissions')).toExist();
  expect(component.find('div.permissions-title')).toExist();
  expect(component.find('div.permissions-content')).toExist();
  expect(component.find('div.permissions-content__label').text()).toEqual('Health Record Access');

  expect(component.find('label.access-radio')).toHaveLength(3);
  expect(component.find('label.access-radio').at(0).find('span').at(3).text()).toEqual('none');
  expect(component.find('label.access-radio').at(1).find('span').at(3).text()).toEqual('full');
  expect(component.find('label.access-radio').at(2).find('span').at(3).text()).toEqual('custom ▼');
});

it('details collapse and expand on click', () => {
  const component = setup(mocks.providerMockE);

  component.find('div.provider-card__titlebar').find('svg').simulate('click');
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toHaveLength(0);
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-right');

  component.find('div.provider-card__titlebar').simulate('click');
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toExist();
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-down');

  component.find('div.provider-card__titlebar').simulate('click');
  expect(component.find('div.provider-card__titlebar')).toExist();
  expect(component.find('div.provider-card__details')).toHaveLength(0);
  expect(component.find('div.provider-card__titlebar-icon').find('svg').prop('data-icon')).toEqual('chevron-right');
});

it('clicking on the custom radio button opens the provider access modal', () => {
  const component = setup(mocks.providerMockE);

  expect(component.find('div.provider-modal')).toHaveLength(0);
  component.find('label.access-radio').find('input').at(2).simulate('click');
  expect(component.find('div.provider-modal')).toExist();
});

it('clicking the x button closes the provider access modal', () => {
  // TO-DO: add that it resets the modal to original state when everything is hooked up
  const component = setup(mocks.providerMockE);

  component.find('label.access-radio').find('input').at(2).simulate('click');
  expect(component.find('div.provider-modal')).toExist();

  component.find('div.modal__buttonbar').find('button').simulate('click');
  expect(component.find('div.provider-modal')).toHaveLength(0);
});


it('clicking the cancel button closes the provider access modal', () => {
  // TO-DO: add that it resets the modal to original state when everything is hooked up
  const component = setup(mocks.providerMockE);

  component.find('label.access-radio').find('input').at(2).simulate('click');
  expect(component.find('div.provider-modal')).toExist();

  component.find('footer.modal__footer').find('button.button-cancel').simulate('click');
  expect(component.find('div.provider-modal')).toHaveLength(0);
});

it('clicking on save button closes the provider access modal', () => {
  // TO-DO: test that it actually saves everything too when hooked up
  const component = setup(mocks.providerMockE);

  component.find('label.access-radio').find('input').at(2).simulate('click');
  expect(component.find('div.provider-modal')).toExist();

  component.find('footer.modal__footer').find('button.button-save').simulate('click');
  expect(component.find('div.provider-modal')).toHaveLength(0);
});
