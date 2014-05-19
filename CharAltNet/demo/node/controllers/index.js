function init(options) {

    console.log('[Index Controller] Init was called');

    require('./http').init(options);
    require('./realtime').init(options);
}

module.exports = init;