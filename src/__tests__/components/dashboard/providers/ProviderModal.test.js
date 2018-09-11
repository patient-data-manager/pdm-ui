import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProviderModal from '../../../../components/dashboard/providers/ProviderModal';
import * as mocks from '../../../../__mocks__/providerMocks';

function setup() {
  const props = {
    isOpen: true,
    title: 'this is a title',
    closeModal: jest.fn()
  };

  return fullRenderComponent(ProviderModal, props);
}

it('renders self and self components', () => {
  const component = setup(mocks.providerMockC);

  expect(component).toBeDefined();
  expect(component.find('div.provider-modal')).toExist();
  expect(component.find('div.modal__header')).toExist();
  expect(component.find('div.modal__body')).toExist();
  expect(component.find('footer.modal__footer')).toExist();
});

it('renders header section correctly', () => {
  const component = setup(mocks.providerMockC);

  expect(component.find('div.modal__heading')).toExist();
  expect(component.find('div.modal__heading').text()).toEqual('this is a title');
  expect(component.find('div.modal__buttonbar')).toExist();
  expect(component.find('div.modal__buttonbar').find('svg').prop('data-icon')).toEqual('times');
});

it('renders body section correctly', () => {
  const component = setup(mocks.providerMockC);

  expect(component.find('div.permissions-title')).toExist();
  expect(component.find('div.permissions-title').text()).toEqual('Custom Permissions');

  expect(component.find('div.permissions-buttons')).toExist();
  expect(component.find('label.access-radio')).toHaveLength(3);
  expect(component.find('label.access-radio').at(0).find('span').at(3).text()).toEqual('No access');
  expect(component.find('label.access-radio').at(1).find('span').at(3).text()).toEqual('Full access');
  expect(component.find('div.radio-button').at(1).find('span.label-note').text())
    .toEqual('(includes full view and edit access)');
  expect(component.find('label.access-radio').at(2).find('span').at(3).text()).toEqual('Partial access');
});

it('renders footer section correctly', () => {
  const component = setup(mocks.providerMockC);

  expect(component.find('footer.modal__footer')).toExist();
  expect(component.find('footer.modal__footer').find('button')).toHaveLength(2);
  expect(component.find('button.button-cancel').text()).toEqual('CANCEL');
  expect(component.find('button.button-save').text()).toEqual('SAVE');
});

it('section custom levels show when custom is selected', () => {
  const component = setup(mocks.providerMockC);

  expect(component.find('div.permissions-partial')).toHaveLength(0);
  component.setState({ accessLevel: 'partial' });
  expect(component.find('div.permissions-partial')).toExist();
  component.setState({ accessLevel: 'full' });
  expect(component.find('div.permissions-partial')).toHaveLength(0);
});

it('renders partial permissions section correctly', () => {
  const component = setup(mocks.providerMockC);

  component.setState({ accessLevel: 'partial' });
  expect(component.find('div.permissions-partial__section')).toHaveLength(8);
  expect(component.find('div.permissions-partial__section-title').at(0).text()).toEqual('Summary');
  expect(component.find('div.permissions-partial__section-title').at(1).text()).toEqual('Conditions');
  expect(component.find('div.permissions-partial__section-title').at(2).text()).toEqual('Allergies');
  expect(component.find('div.permissions-partial__section-title').at(3).text()).toEqual('Medications');
  expect(component.find('div.permissions-partial__section-title').at(4).text()).toEqual('Immunizations');
  expect(component.find('div.permissions-partial__section-title').at(5).text()).toEqual('Procedures');
  expect(component.find('div.permissions-partial__section-title').at(6).text()).toEqual('Labs');
  expect(component.find('div.permissions-partial__section-title').at(7).text()).toEqual('Vitals');
});