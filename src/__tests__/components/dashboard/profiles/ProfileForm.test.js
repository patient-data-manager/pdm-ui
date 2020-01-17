import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProfileForm from '../../../../components/dashboard/profiles/ProfileForm';
import * as mocks from '../../../../__mocks__/profileMocks';

function setupNew() {
  const props = {
    showDelete: false,
    saveProfile: jest.fn(),
    cancel: jest.fn()
  };

  return fullRenderComponent(ProfileForm, props);
}

function setupEdit(profile) {
  const props = {
    showDelete: true,
    profile: profile,
    saveProfile: jest.fn(),
    deleteProfile: jest.fn(),
    cancel: jest.fn()
  };

  return fullRenderComponent(ProfileForm, props);
}

it('renders self and self components', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component).toBeDefined();
  expect(component.find('form.profile-form__form')).toExist();
  expect(component.find('div.profile-form__form-group')).toHaveLength(8);
  expect(component.find('div.profile-form__buttons')).toExist();
});

it('validates all text inputs correctly', () => {
  const component = setupNew();

  // required fields
  component.find('form').simulate('submit');
  // expect(component.find('FormHelperText').at(0)).toHaveText('this field is required');
  // expect(component.find('FormHelperText').at(1)).toHaveText('this field is required');
});

it('renders a profile picture correctly', () => {
  const component = setupEdit(mocks.profileMockC);

  expect(component.find('.profile-form__photo')).toExist();
  expect(component.find('.profile-form__photo img[src="http://localhost:3001/photo.jpg"]')).toHaveLength(1);
});

it('renders self placeholder image correctly', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component.find('.profile-form__photo')).toExist();
  expect(component.find('.profile-form__photo').find('svg').prop('xmlns')).toEqual('http://www.w3.org/2000/svg');
});

it('renders other placeholder image correctly', () => {
  const component = setupEdit(mocks.profileMockB);

  expect(component.find('.profile-form__photo')).toExist();
  expect(component.find('.profile-form__photo').find('svg').prop('data-icon')).toEqual('user-circle');
});

it('renders new form correctly', () => {
  const component = setupNew();

  expect(component.find('div.first-name').find('input').prop('value')).toEqual('');
  expect(component.find('div.middle-initial').find('input').prop('value')).toEqual('');
  expect(component.find('div.last-name').find('input').prop('value')).toEqual('');
  expect(component.find('div.birthday').find('input').prop('value')).toEqual('');
  expect(component.state().gender).toEqual(undefined);

  expect(component.find('div.street-address').find('input').prop('value')).toEqual('');
  expect(component.find('div.city').find('input').prop('value')).toEqual('');
  expect(component.find('input#state').prop('value')).toEqual('');
  expect(component.find('div.zip-code').find('input').prop('value')).toEqual('');

  expect(component.state().telephone).toEqual(undefined);
  expect(component.find('input#phoneType').prop('value')).toEqual('');
  expect(component.find('input#relationship').prop('value')).toEqual('');

  expect(component.find('button.button-cancel')).toExist();
  expect(component.find('button.button-delete')).toHaveLength(0);
  expect(component.find('button.button-save')).toExist();
});

it('renders edit form correctly', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component.find('div.first-name').find('input').prop('value')).toEqual('Jane');
  expect(component.find('div.middle-initial').find('input').prop('value')).toEqual('E');
  expect(component.find('div.last-name').find('input').prop('value')).toEqual('Doe');
  expect(component.find('div.birthday').find('input').prop('value')).toEqual('1982-07-21');
  expect(component.state().gender).toEqual('female');

  expect(component.find('div.street-address').find('input').prop('value')).toEqual('123 Fake St');
  expect(component.find('div.city').find('input').prop('value')).toEqual('Boston');
  expect(component.find('input#state').prop('value')).toEqual('MA');
  expect(component.find('div.zip-code').find('input').prop('value')).toEqual('00000');

  expect(component.state().telephone).toEqual('(555) 298-9827');
  expect(component.find('input#phoneType').prop('value')).toEqual('mobile');
  expect(component.find('input#relationship').prop('value')).toEqual('self');

  expect(component.find('button.button-cancel')).toExist();
  expect(component.find('button.button-delete')).toExist();
  expect(component.find('button.button-save')).toExist();
});

it('text inputs update when changed', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component.find('div.first-name').find('input').prop('value')).toEqual('Jane');
  component.find('div.first-name').find('input').simulate('change', { target: { value: 'Janie' } });
  expect(component.find('div.first-name').find('input').prop('value')).toEqual('Janie');

  expect(component.find('div.middle-initial').find('input').prop('value')).toEqual('E');
  component.find('div.middle-initial').find('input').simulate('change', { target: { value: 'X' } });
  expect(component.find('div.middle-initial').find('input').prop('value')).toEqual('X');

  expect(component.find('div.last-name').find('input').prop('value')).toEqual('Doe');
  component.find('div.last-name').find('input').simulate('change', { target: { value: 'Deer' } });
  expect(component.find('div.last-name').find('input').prop('value')).toEqual('Deer');

  expect(component.find('div.street-address').find('input').prop('value')).toEqual('123 Fake St');
  component.find('div.street-address').find('input').simulate('change', { target: { value: '321 Here St' } });
  expect(component.find('div.street-address').find('input').prop('value')).toEqual('321 Here St');

  expect(component.find('div.city').find('input').prop('value')).toEqual('Boston');
  component.find('div.city').find('input').simulate('change', { target: { value: 'Narnia' } });
  expect(component.find('div.city').find('input').prop('value')).toEqual('Narnia');

  expect(component.find('div.zip-code').find('input').prop('value')).toEqual('00000');
  component.find('div.zip-code').find('input').simulate('change', { target: { value: '12345' } });
  expect(component.find('div.zip-code').find('input').prop('value')).toEqual('12345');
});

it('selector inputs update when changed', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component.find('input#state').prop('value')).toEqual('MA');
  component.setState({ state: 'NY' });
  expect(component.find('input#state').prop('value')).toEqual('NY');

  expect(component.find('input#phoneType').prop('value')).toEqual('mobile');
  component.setState({ telephone_use: 'work' });
  expect(component.find('input#phoneType').prop('value')).toEqual('work');

  expect(component.find('input#relationship').prop('value')).toEqual('self');
  component.setState({ relationship: 'son' });
  expect(component.find('input#relationship').prop('value')).toEqual('son');
});

it('phone inputs update when changed', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component.state().telephone).toEqual('(555) 298-9827');
  component.find('div.phone').find('input').simulate('change', { target: { value: '(222) 298-9827' } });
  expect(component.state().telephone).toEqual('(222) 298-9827');
});

it('dates inputs update when changed', () => {
  const component = setupEdit(mocks.profileMockA);

  expect(component.find('div.birthday').find('input').prop('value')).toEqual('1982-07-21');
  component.find('div.birthday').find('input').simulate('change', { target: { value: '1987-07-21' } });
  expect(component.find('div.birthday').find('input').prop('value')).toEqual('1987-07-21');
});
