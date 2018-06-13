import React from 'react';
import ReactDOM from 'react-dom';
import { Register } from './Register';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

it('renders without crashing', () => {
  const wrapper = shallow(<Register />);
  wrapper.unmount();
});


it('correctly validates email addresses', () => {
  const wrapper = shallow(<Register />);	
  const goodEmails = ["test@example.com", "someemailaddress@someurl.reallylongtld"];
  goodEmails.forEach((email) => expect( wrapper.instance().isValidEmail(email) ).to.equal(true) );

  const badEmails = ["@.", "testemail.com", "asdf"];
  badEmails.forEach((email) => expect( wrapper.instance().isValidEmail(email) ).to.equal(false) );
  wrapper.unmount();
});

it('correctly validates passwords', () => {
  const wrapper = shallow(<Register />); 
  const goodPasswords = ["hunter2", "password", "correct horse battery staple"];
  goodPasswords.forEach((pass) => expect( wrapper.instance().isValidPassword(pass) ).to.equal(true) );

  const badPasswords = ["!@#$%", "short", "1234"];
  badPasswords.forEach((pass) => expect( wrapper.instance().isValidPassword(pass) ).to.equal(false) );
  wrapper.unmount();
});