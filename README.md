# Test Project

Coding exercise

## Prerequisites

- [Node.js][] and [npm][]
- [Gulp][]
- [MongoDB][]

## Setup

From a terminal:

- run `npm install` (may need to sudo) in both the root directory and the "app"
directory
- run `gulp` inside the "app" directory
- create a database named "dbUsers" within your local mongo data store (with
mongod running you can execute `./create_db.sh` from the root directory)
- execute `node index.js` from the root directory to start the server
- navigate to "http://localhost:1337/dist" from with a web browser


[Node.js]:  https://nodejs.org/
[npm]:      https://www.npmjs.com/
[Gulp]:     http://gulpjs.com/
[MongoDB]:  https://www.mongodb.org/
