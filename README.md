#Hello

An interactive portal for learning american sign languge. Unauthenticated users can only interact with the Learn mode.  Users who don't have a Leap Motion can still study but none of the interactive 3D or custom gesture modes are available.

##Table of Contents
* [Team Members](#team-members)
* [Tech Stack, API's and Third-party Tools](#tech-stack-apis-and-third-party-tools)
* [Folder and File Structure](#folder-and-file-structure)
* [Setting up the Development Environment](#setting-up-the-development-environment)
* [Starting the app](#starting-the-app)
* [System Architecture](#system-architecture)
* [Database Schema](#database-schema)
* [API](#api)
* [License](#license)

##Team Members
[![Richard May](https://dl.dropboxusercontent.com/s/41cimwsbuny9ttw/richardmay.png?dl=0)](https://github.com/mybrainishuge)

[![Ashwini Jogwar](https://dl.dropboxusercontent.com/s/ckfybtzu0fjtbbg/ashwinijogwar.png?dl=0)](https://github.com/ashjd)

[![Prateek Madapurmath](https://dl.dropboxusercontent.com/s/aidbu417x5w824b/prateek.png?dl=0)](https://github.com/prateekm33)

[![Tj Carskadon](https://dl.dropboxusercontent.com/s/ptn5p1jldlyby48/tjcarskadon.png?dl=0)](http://github.com/tjcarskadon)

##Tech Stack, API's and Third-party Tools
* [Angular 2](https://angular.io/) for the front end framework
* [Angular Material](https://material.angular.io/)- a styling framework for google material design and Angular 2
* [Webpack](https://webpack.github.io/)
* [Node.js](https://nodejs.org/en/) and [Express](http://expressjs.com/) for serving static pages. 
* [Nodal](http://www.nodaljs.com/) for API 
* [Postgres](http://www.postgresql.org/) for database
* [Docker](https://www.docker.com/) for micro service management
* [AWS](https://aws.amazon.com/) for deployment


##Folder and File Structure
    hello/
    |
    |--config/ - basic config files
    |
    |--dist/ - bundle locatoin
    |
    |--servers/
        |
        |--api/
            |
            |--Nodal Server
        |
        |--static/
            |
            |--Node / Express server
    |--src/ - Angular 2 Client
        |
        |--app/
            |
            |--create
            |
            |--learn
            |
            |--lib
            |
            |--login
            |
            |--neurons
            |
            |--play
            |
            |--profile
            |
            |--router-active
            |
            |--signup
            |
            |--spell
            |
            |--welcome
            |
            |--welcomeContent
            |
            |--welcomeState
        |
        |--assests/
            |
            |--css
            |
            |--icon
            |
            |--img
            |
            |--mock-data
        |
        |--platform
        |
        |--typings
            |
            |--globals
    |
    |--docs/
    |
    

##Setting up the Development Environment

##How to start the app

###Using Docker:
- [ ] Ensure you have docker installed locally and your default machine is running
- [ ] Create a directory where you want to run the file
- [ ] Copy the docker-compose.yml file from the repo to your new directory
- [ ] Run the command docker-compose up -d (the -d flag will run the machine in the background)
- [ ] Get the ip address of your docker machine by running docker-machine ip
- [ ] Navigate to this IP in your browser

###Running without docker:
The below instructions assume you have cloned or downloaded the repo to your local machine.

###Install dependencies: 
- [ ] Install postrgres
- [ ] Navigate to the root directory and run `npm run deps`

###Starting the app
- [ ] Start your postgres database
- [ ] Open a new terminal window and navigate to the root file of the project
- [ ] If this is the first time you are starting the app you need to run `npm run db-build` to build the database. 
- [ ] run `npm run nodal` from the root directory of the project - this bootstraps the db and launches nodal. Note this will hijack your terminal window.  If you would like nodal to run in the background run `npm run nodal &`.  Nodal will now be running as a backround job.  
- [ ] If you are not running nodal in the back ground then open a new terminal window and navigate to the root file of the project

####Running Hello in local production mode:
- [ ] To run the app in production mode  `npm run hello-prod`.  This will make a new build. Launch a web server on port 8000 serving the bundle file.   
- [ ] You can now open `http://localhost:8000/` and view the production build

####Running Hello in local development mode:
- [ ] If you want to run in development mode you will need another terminal windows open in addition to however you have chosen to run Nodal.
- [ ] In this new terminal window navigate to the root of the project and run `npm run hello-dev` This should make a new build and server this with the webpack dev server on port 3000.
- [ ] You can now access the app from your browser at `localhost:3000`

##System Architecture
![architecture](https://dl.dropboxusercontent.com/s/febxrjnjxbdbsrh/Hello%20Architecture.png?dl=0)

![aws architecture](https://dl.dropboxusercontent.com/s/zwwtlxx2f9uuvm8/AWS%20Archeticture%20.png?dl=0)
##Database Schema
![schema](https://dl.dropboxusercontent.com/s/q9vlwc7uwrn0knw/hello%20ERD.png?dl=0)

##API 
The API endpoints follow the database schema and all accept standard requests except Logins (not listed in ERD because there is no database interaction).  The purpose of the logins endpoint is to authorize a user by accepting the return of a token for that user.

##License
MIT