if (process.env.NODE_ENV === 'test') {
  module.exports = require('./apikey.test');
} else {
  module.exports = require('./apikey.prod');
}
