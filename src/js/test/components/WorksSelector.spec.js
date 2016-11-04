import test from 'ava';
import React from 'react';
import 'react-addons-test-utils';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import WorksSelector from '../../components/WorksSelector';
import { SHOW_ALL, SHOW_BOOK } from '../../constants/WorksFilters';

function setup(props) {
  const component = shallow(
    <WorksSelector
      handleShowByWorksFilter={props.handleShowByWorksFilter}
      selectedWorksFilter={props.selectedWorksFilter}
    />
  );

  return {
    component,
    select: component.find('.select'),
  };
}

test('should render five option children', t => {
  const { select } = setup({
    handleShowByWorksFilter: () => {},
    selectedWorksFilter: SHOW_ALL,
  });
  t.same(select.children().length, 5);
});

test('should call selectedWorksFilter the value changed', t => {
  const spy = sinon.spy();
  const { select } = setup({
    handleShowByWorksFilter: spy,
    selectedWorksFilter: SHOW_ALL,
  });
  const e = {
    stopPropagation: () => {},
    target: {
      value: SHOW_BOOK,
    },
  };

  select.simulate('change', e);
  t.ok(spy.calledWith(SHOW_BOOK));
});
