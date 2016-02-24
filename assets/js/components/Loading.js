if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Loading.prod');
} else {
  module.exports = require('./Loading.dev');
}
