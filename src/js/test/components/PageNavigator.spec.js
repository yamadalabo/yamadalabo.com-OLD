import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import PageNavigator from '../../components/PageNavigator';

function setup() {
  const component = shallow(
    <PageNavigator />,
  );

  return {
    component,
    children: component.children(),
  };
}

test('should have 5 children', (t) => {
  const { children } = setup();
  t.deepEqual(children.length, 5);
});

test('children should be Link component', (t) => {
  const { children } = setup();
  t.truthy(children.everyWhere(child => child.type(Link)));
});
