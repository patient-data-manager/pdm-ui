import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import createRouterContext from 'react-router-test-context';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';

function fullRenderComponent(ComponentClass, props = {}) {
  const context = createRouterContext();
  ComponentClass.contextTypes = { // eslint-disable-line no-param-reassign
    router: PropTypes.object
  };
  return mount(
    <ComponentClass id="root" {...props} />,
    { context }
  );
}

function shallowRenderComponent(ComponentClass, props = {}) {
  const context = createRouterContext();
  return shallow(
    <ComponentClass id="root" {...props} />,
    { context }
  );
}

function fullRenderContainer(ComponentClass, props = {}, store = {}) {
  const routerContext = createRouterContext();
  const mockStore = createMockStore(store);
  const context = { ...routerContext, store: mockStore };

  ComponentClass.contextTypes = { // eslint-disable-line no-param-reassign
    router: PropTypes.object,
    store: PropTypes.object
  };

  return mount(
    <Router><ComponentClass store={mockStore} {...props} /></Router>,
    { context }
  );
}

function shallowRenderContainer(ComponentClass, props = {}, store) {
  return shallowWithStore(
    <ComponentClass id="root" {...props} />,
    createMockStore(store)
  );
}

export {
  fullRenderComponent,
  fullRenderContainer,
  shallowRenderComponent,
  shallowRenderContainer
};
