module.exports = process.env.NODE_ENV === 'production' ? require('./Profile.prod') : require('./Profile.dev');
