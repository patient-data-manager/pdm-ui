import React from 'react';
import { Alert } from '../../containers/Alert/Alert';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Alert />);
  wrapper.unmount();
});
