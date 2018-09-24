import { fullRenderComponent } from '../../../../utils/testHelpers';
import ProfileCard from '../../../../components/dashboard/profiles/ProfileCard';
import { profileMockA, profileMockB, profileMockC } from '../../../../__mocks__/profileMocks';

function setup(profile, isHeader) {
  const props = {
    profile,
    activeProfile: profile,
    isHeader: isHeader,
    updateProfile: jest.fn(),
    deleteProfile: jest.fn(),
    setActiveProfile: jest.fn()
  };

  return fullRenderComponent(ProfileCard, props);
}

it('renders self and self components', () => {
  const component = setup(profileMockC);

  expect(component).toBeDefined();
  expect(component.find('div.profile-card__info')).toExist();
  expect(component.find('div.profile-card__edit-button')).toExist();
  expect(component.find('div.profile-card__image')).toExist();
  expect(component.find('div.profile-card__details')).toExist();
});

it('renders a profile picture correctly', () => {
  const component = setup(profileMockC);

  expect(component.find('.profile-card__image')).toExist();
  expect(component.find('.profile-card__image img[src="http://localhost:3001/photo.jpg"]')).toHaveLength(1);
});

it('renders self placeholder image correctly', () => {
  const component = setup(profileMockA);

  expect(component.find('.profile-card__image')).toExist();
  expect(component.find('.profile-card__image').find('svg').prop('xmlns')).toEqual('http://www.w3.org/2000/svg');
});

it('renders other placeholder image correctly', () => {
  const component = setup(profileMockB);

  expect(component.find('.profile-card__image')).toExist();
  expect(component.find('.profile-card__image').find('svg').prop('data-icon')).toEqual('user-circle');
});

it('renders details correctly', () => {
  const component = setup(profileMockA);

  expect(component.find('span.details-alerts > span')).toExist();
  expect(component.find('span.details-alerts > span').text()).toEqual('3');
  expect(component.find('div.details-name')).toExist();
  expect(component.find('div.details-name').text()).toEqual('Jane E Doe');

  expect(component.find('div.details-age')).toExist();
  expect(component.find('div.details-age').text()).toEqual('36 YRS');
  expect(component.find('div.details-gender')).toExist();
  expect(component.find('div.details-gender').text()).toEqual('female');
  expect(component.find('div.details-relation')).toExist();
  expect(component.find('div.details-relation').text()).toEqual('self');
});

// TO-DO: add this back in when alerts are not hard coded
// it('no badge displayed if no alerts', () => {
//   const component = setup(null, 0);

//   expect(component.find('span.details-alerts')).toHaveLength(0);
//   expect(component.find('div.details-name')).toExist();
//   expect(component.find('div.details-name').text()).toEqual('Jane E Doe');
// });

it('card display is different if it is the active profile', () => {
  const component = setup(profileMockA, true);

  expect(component.find('div.profile-card')).toExist();
  expect(component.find('div.profile-card__wrapper').hasClass('is-header')).toBeTruthy();
  expect(component.find('div.profile-card__edit-button')).toHaveLength(0);
});

it('clicking the edit button opens profile form', () => {
  const component = setup(profileMockA);

  expect(component.find('div.profile-card__edit-button')).toExist();
  expect(component.find('div.profile-form')).toHaveLength(0);

  component.find('div.profile-card__edit-button').find('button').simulate('click');
  expect(component.find('div.profile-form')).toExist();
});

it('form cancel button closes form', () => {
  const component = setup(profileMockA);

  component.find('div.profile-card__edit-button').find('button').simulate('click');
  expect(component.find('button.button-cancel')).toExist();

  component.find('button.button-cancel').simulate('click');
  expect(component.find('div.profile-card')).toExist();
  expect(component.find('div.profile-form')).toHaveLength(0);
});

it('form delete button removes card from list and closes form', () => {
  const component = setup(profileMockA);

  component.find('div.profile-card__edit-button').find('button').simulate('click');
  expect(component.find('button.button-delete')).toExist();

  component.find('button.button-delete').simulate('click');
  setTimeout(() => {
    expect(component.find('div.react-confirm-alert')).toExist();
    component.find('div.react-confirm-alert').find('button').at(0).simulate('click');
    expect(component.find('div.profile-card')).toHaveLength(0);
    expect(component.find('div.profile-form')).toHaveLength(0);
  }, 100); // needed to load conformation modal
});

// TO-DO: fix this
// it('form save button updates profile', () => {
//   const component = setup(profileMockA);

//   component.find('div.profile-card__edit-button').find('button').simulate('click');
//   expect(component.find('button.button-save')).toExist();

//   // expect(component.find('div.first_name').find('input').value()).toEqual('Jane');
//   expect(component.find('div.first_name').find('input').prop('value')).toEqual('Jane');
//   component.find('div.first_name').find('input').simulate('change', { target: { value: 'Janie' } });
//   expect(component.find('div.first_name').find('input').prop('value')).toEqual('Janie');

//   component.find('button.button-save').simulate('submit');
//   expect(component.find('div.profile-card')).toExist();
//   expect(component.find('div.profile-form')).toHaveLength(0);
//   expect(component.find('div.details-name').text()).toEqual('Janie E Doe');
// });
