'use strict';

var Config = {
  rippleOptions: {
    trace: false,
    trusted: true,
    local_signing: true,
    servers: [
      {host: 's-west.ripple.com', port: 443, secure: true}
    ]
  }
};

module.exports = Config;
