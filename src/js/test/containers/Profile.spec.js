import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Profile from '../../containers/Profile.dev';
import PageNavigator from '../../components/PageNavigator';

function setup() {
  const component = shallow(
    <Profile />,
  );

  return {
    component,
  };
}

test('should have PageNavigator as a first child', (t) => {
  const { component } = setup();
  t.truthy(component.childAt(0).type(), PageNavigator);
});

test('should have content class div as a second child', (t) => {
  const { component } = setup();
  t.truthy(component.childAt(1).type(), 'div.content');
});
