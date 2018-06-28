import React from 'react';
import { HealthRecord } from '../../containers/HealthRecord/HealthRecord';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<HealthRecord />);
  wrapper.unmount();
});
