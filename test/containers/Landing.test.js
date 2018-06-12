import React from 'react';
import ReactDOM from 'react-dom';
import  Landing  from '../../src/containers/Landing';
import { shallow, mount, render } from 'enzyme';


it('renders without crashing', () => {
  const wrapper = shallow(<Landing />);
  wrapper.unmount();
});
