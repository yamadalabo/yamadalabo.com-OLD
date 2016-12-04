import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import moment from 'moment';
import Posts from '../../components/Posts';
import { entities1, worksEntities1 } from '../helper/infoForState';

function setup(props) {
  const component = shallow(
    <Posts
      pagePath={props.pagePath}
      entities={props.entities}
    />,
  );

  return {
    component,
  };
}

test('should render children', (t) => {
  const { component } = setup({ pagePath: '/foo', entities: entities1 });
  t.truthy(component.forEach(n =>
    n.childAt(0).childAt(1).type(Link),
  ));
  t.truthy(component.forEach(n =>
    moment(n.childAt(0).childAt(0).text(), 'MMMM YYYY', true).isValid(),
  ));
});

test('should render workType depending on pageType', (t) => {
  const { component } = setup({ pagePath: '/works', entities: worksEntities1 });
  t.truthy(component.forEach(n =>
    n.childAt(0).childAt(0).children().length === 3,
  ));
});
