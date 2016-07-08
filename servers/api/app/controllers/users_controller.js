module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const User = Nodal.require('app/models/user.js');
  const AccessToken = Nodal.require('app/models/access_token.js');

  class UsersController extends Nodal.Controller {

    index() {

      User.query()
        .where(this.params.query)
        .end((err, models) => {
          
          this.respond(err || models);

        });

    }

    show() {

      User.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      //call accessToken.login passing in the appropriate params 
     
      



      User.create(this.params.body, (err, model) => {
        // let tokenParams = {
        //   grant_type: 'password',
        //   email: this.params.body.email
        // }
        this.params.body.grant_type='password';

        if(!err) {
          AccessToken.login(this.params, (err, accessToken) => {
            if(!err) {
              this.respond(err || accessToken)
            } else {
              console.log("model error")
            }
          });
        }
        // this.respond(err || model);

      });

    }

    update() {
        console.log(this.params);
      User.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      User.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return UsersController;

})();
