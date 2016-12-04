module.exports = process.env.NODE_ENV === 'production' ? require('./Home.prod') : require('./Home.dev');
