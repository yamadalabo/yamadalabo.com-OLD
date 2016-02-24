if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Profile.prod');
} else {
  module.exports = require('./Profile.dev');
}
