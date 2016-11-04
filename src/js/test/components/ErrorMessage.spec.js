import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import ErrorMessage from '../../components/ErrorMessage';

function setup(message = 'Test error message') {
  const component = shallow(
    <ErrorMessage message={message} />
  );

  return {
    component,
    h1: component.find('h1'),
  };
}

test('should display message', t => {
  const { h1 } = setup();
  t.regex(h1.text(), /^Test error message/);
});
