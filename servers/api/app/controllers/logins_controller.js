module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Login = Nodal.require('app/models/login.js');
  const AuthController = Nodal.require('app/controllers/auth_controller.js')

  class LoginsController extends AuthController {

    index() {


   this.authorize((accesToken, user) => {
    
        this.setHeader('Cache-Control', 'no-store');
        this.setHeader('Pragma', 'no-cache');
        this.respond("Authorized");
      });
        
      // Login.query()
      //   .where(this.params.query)
      //   .end((err, models) => {

      //     this.respond(err || models);

      //   });

    }

    show() {

      Login.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      this.authorize((accesToken, user) => {
        this.respond("Authorized");
      });
    }

    update() {

      Login.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Login.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return LoginsController;

})();
