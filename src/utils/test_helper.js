// copied from https://github.com/StephenGrider/ReduxSimpleStarter

import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';

const { JSDOM } = jsdom;

global.document = new JSDOM('<!doctype html><html><body></body></html>');
global.window = global.document.window;

global.navigator = {
  userAgent: 'node.js'
};

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// Handle Promise Rejection Warnings
process.on('unhandledRejection', warning => {});

const $ = _$(window);

export class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

_$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
