import React from 'react';
import { Login } from '../../containers/Login/Login';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Login />);
  wrapper.unmount();
});
