'use strict';

const log4js = require('log4js');

log4js.configure({
  appenders: {
    'out': {
      'type': 'console'
    }
  },
  categories: {
    'default': {
      'appenders': [
        'out'
      ],
      'level': 'debug'
    }
  }
});

module.exports.getLogger = category => log4js.getLogger(category);
