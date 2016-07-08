module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  class Gesture extends Nodal.Model {}

  Gesture.setDatabase(Nodal.require('db/main.js'));
  Gesture.setSchema(Nodal.my.Schema.models.Gesture);

  return Gesture;

})();
