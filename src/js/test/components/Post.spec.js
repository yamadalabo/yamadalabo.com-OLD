import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import moment from 'moment';
import Post from '../../components/Post';

function setup(props) {
  const component = shallow(
    <Post
      title={props.title}
      body={props.body}
      timestamp={props.timestamp}
    />,
  );

  return {
    component,
    h1: component.find('h1'),
    divdate: component.find('div.date.upcase'),
    divbody: component.find('div.post__body'),
  };
}

let postProps;

test.beforeEach(() => {
  postProps = {
    title: 'foo',
    body: '<p>bar</p>',
    timestamp: moment().unix(),
  };
});

test('should render title', (t) => {
  const { h1 } = setup(postProps);
  t.regex(h1.childAt(1).text(), /^foo/);
});

test('should render date', (t) => {
  const { divdate } = setup(postProps);
  t.truthy(moment(divdate.text(), 'MMMM YYYY', true).isValid());
});

test('should render body', (t) => {
  const { divbody } = setup(postProps);
  t.truthy(divbody.html(), '<div class="post__body"><p>bar</p></div>');
});
