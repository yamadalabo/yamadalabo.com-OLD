module.exports = process.env.NODE_ENV === 'production' ? require('./createStoreWithMiddleware.prod') : require('./createStoreWithMiddleware.dev');
