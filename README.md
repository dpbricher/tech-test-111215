# Test Project

Coding exercise

## Prerequisites

- [Node.js][] and [npm][] (Node.js version v4.2.2)
- [Gulp][] (version 3.9)
- [MongoDB][] (version 2.6.3)

## Setup

From a terminal:

- run `sudo npm install` in both the root directory and the "app"
directory
- run `gulp` inside the "app" directory
- ensure mongod is running (execute `mongod` from within another terminal if it is not)
- create a database named "dbUsers" within your local mongo data store and give it a collection named "users" (you can execute `./create_db.sh` from the root directory)
- execute `node index.js` from the root directory to start the server
- navigate to "http://localhost:1337/dist" from within a web browser


[Node.js]:  https://nodejs.org/
[npm]:      https://www.npmjs.com/
[Gulp]:     http://gulpjs.com/
[MongoDB]:  https://www.mongodb.org/
