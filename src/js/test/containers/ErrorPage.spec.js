import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import ErrorPage from '../../containers/ErrorPage';
import PageNavigator from '../../components/PageNavigator';
import ErrorMessage from '../../components/ErrorMessage';

function setup() {
  const component = shallow(
    <ErrorPage />
  );

  return {
    component,
  };
}

test('should have PageNavigator as a first child', t => {
  const { component } = setup();
  t.ok(component.childAt(0).type(), PageNavigator);
});

test('should have ErrorMessage as a second child', t => {
  const { component } = setup();
  t.ok(component.childAt(1).type(), ErrorMessage);
});
