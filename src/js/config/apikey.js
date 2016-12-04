module.exports = process.env.NODE_ENV === 'test' ? require('./apikey.test') : require('./apikey.prod');
