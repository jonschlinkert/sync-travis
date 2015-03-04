/*!
 * sync-travis <https://github.com/jonschlinkert/sync-travis>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Travis = require('travis-ci');

/**
 * Sync travis projects with GitHub
 */

module.exports = function sync(env, cb) {
  var travis = new Travis({version: '2.0.0'});
  env = env || {};

  travis.authenticate({
    username: env.username,
    password: env.password
  }, function (err, res) {
    if (err) return cb(err);

    travis.users.sync.post(function (err, result) {
      if (err) return cb(err);
      cb(null, result);
    });
  });
};
