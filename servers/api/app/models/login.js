module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  class Login extends Nodal.Model {}

  Login.setDatabase(Nodal.require('db/main.js'));
  Login.setSchema(Nodal.my.Schema.models.Login);

  return Login;

})();
