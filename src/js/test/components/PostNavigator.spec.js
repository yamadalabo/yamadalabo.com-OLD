import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import PostNavigator from '../../components/PostNavigator';

function setup(props) {
  const component = shallow(
    <PostNavigator
      prevPath={props.prevPath}
      nextPath={props.nextPath}
    />,
  );

  return {
    component,
  };
}

test('should render no Link when no props exists', (t) => {
  const { component } = setup({ prevPath: null, nextPath: null });
  t.deepEqual(component.children().length, 0);
});

test('should render prev Link component when prevPath exists', (t) => {
  const { component } = setup({ prevPath: '/foo', nextPath: null });
  t.truthy(component.find('.left').childAt(0).type(Link));
});

test('should render next Link component when nextPath exists', (t) => {
  const { component } = setup({ prevPath: null, nextPath: '/bar' });
  t.deepEqual(component.find('.right').childAt(0).type(), Link);
});

test('should render both prev Link and next Link when prevPath and nextPath exist', (t) => {
  const { component } = setup({ prevPath: '/foo', nextPath: '/bar' });
  t.deepEqual(component.children().length, 2);
});
