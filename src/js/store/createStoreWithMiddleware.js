if (process.env.NODE_ENV === 'production') {
  module.exports = require('./createStoreWithMiddleware.prod');
} else {
  module.exports = require('./createStoreWithMiddleware.dev');
}
