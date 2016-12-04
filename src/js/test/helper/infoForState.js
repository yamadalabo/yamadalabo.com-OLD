import moment from 'moment';
import { PAPER } from '../../constants/Works';

function randomId() {
  return Math.random() * 1000000000;
}

export const time1 = moment().unix();
export const time2 = moment().add(10, 's').unix();

export const entities1 = [
  {
    id: randomId(),
    title: 'entityA',
    body: '<p>A</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityB',
    body: '<p>B</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityC',
    body: '<p>C</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityD',
    body: '<p>D</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityE',
    body: '<p>E</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityF',
    body: '<p>F</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityG',
    body: '<p>G</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityH',
    body: '<p>H</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityI',
    body: '<p>I</p>',
    timestamp: time1,
  },
  {
    id: randomId(),
    title: 'entityJ',
    body: '<p>J</p>',
    timestamp: time1,
  },
];

export const entities2 = [
  {
    id: randomId(),
    title: 'entityK',
    body: '<p>K</p>',
    timestamp: time2,
  },
  {
    id: randomId(),
    title: 'entityL',
    body: '<p>L</p>',
    timestamp: time2,
  },
  {
    id: randomId(),
    title: 'entityM',
    body: '<p>M</p>',
    timestamp: time2,
  },
];

export const worksEntities1 = entities1.map(entity =>
  Object.assign({}, entity, {
    workType: PAPER,
  }),
);

export const worksEntities2 = entities2.map(entity =>
  Object.assign({}, entity, {
    workType: PAPER,
  }),
);
