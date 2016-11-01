// This file set environement variables used in the rest of the client side application. 
// there are three choices for the  ENV var - development, docker and production.  
// the url will be set apprpriately based on how the ENV var is set 
// TODO: add a fetch to the entery piont to get the current NODE_ENV var and set the status based on that.

export const envVars = {
  ENV: <string> null,
  url: <string> null
}
//set the ENV property here
envVars.ENV = 'production';

if(envVars.ENV === 'production') {
  envVars.url = 'http://52.205.170.83:3333/';
} else if (envVars.ENV === 'docker') {
  envVars.url = 'http://192.168.99.100:3333/';
} else {
  envVars.url = 'http://127.0.0.1:3333/';
}
