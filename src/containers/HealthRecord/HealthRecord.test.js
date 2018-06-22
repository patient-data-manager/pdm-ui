import React from 'react';
import { HealthRecord } from './HealthRecord';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<HealthRecord />);
  wrapper.unmount();
});
