import {
  startFetching,
  succeedInFetching,
  failToFetch,
} from '../sync/works';
import get from '../../utils/api/works';
import APIKEY from '../../config/apikey';

const fetchWorks = async (offset = 0) => {
  const params = {
    api_key: APIKEY,
    offset,
  };
  const {
    entities,
    error,
    totalPosts,
  } = await get(params);

  if (typeof error !== 'undefined') {
    return {
      errorMessage: error.message || 'Something bad happened',
    };
  }
  const fetchedPostsNum = offset + entities.length;
  const totalPostsNum = parseInt(totalPosts, 10);
  if (fetchedPostsNum === totalPostsNum) {
    return { entities };
  }

  const {
    entities: nextEntities,
    errorMessage: nextErrorMessage,
  } = await fetchWorks(offset + 20);
  return Object.assign({}, {
    entities: entities.concat(nextEntities),
  }, {
    errorMessage: nextErrorMessage,
  });
};

export default () =>
  async (dispatch) => {
    dispatch(startFetching());
    const { entities, errorMessage } = await fetchWorks();
    if (typeof errorMessage !== 'undefined') {
      dispatch(failToFetch(errorMessage));
    } else {
      dispatch(succeedInFetching(entities));
    }
  };
