if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Home.prod');
} else {
  module.exports = require('./Home.dev');
}
