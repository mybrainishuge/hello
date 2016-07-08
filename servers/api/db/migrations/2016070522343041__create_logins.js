module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateLogins extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016070522343041;
    }

    up() {

      return [
        this.createTable("logins", [])
      ];

    }

    down() {

      return [
        this.dropTable("logins")
      ];

    }

  }

  return CreateLogins;

})();
