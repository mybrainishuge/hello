module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateGestures extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016063003445209;
    }

    up() {

      return [
        this.createTable("gestures", [{"name":"data","type":"json"}])
      ];

    }

    down() {

      return [
        this.dropTable("gestures")
      ];

    }

  }

  return CreateGestures;

})();
