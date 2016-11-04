import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Loading from '../../components/Loading';

function setup() {
  const component = shallow(
    <Loading />
  );
  return {
    component,
  };
}

test('should render img element', t => {
  const { component } = setup();
  t.same(component.childAt(0).type(), 'img');
});
