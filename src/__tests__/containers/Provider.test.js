import React from 'react';
import { Provider } from '../../containers/Provider/Provider';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Provider />);
  wrapper.unmount();
});
