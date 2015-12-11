var mdb             = require("mongodb");
var childProc       = require("child_process");

var express         = require("express");
var session         = require("express-session");
// express middleware includes
var bodyParser      = require("body-parser");
// # multer          = require "multer"

// # gridFsStream    = require "gridfs-stream"


var DATABASE_URL    = "localhost:27017/dbUsers";

// MAX_RAW_UPLOAD  = "1gb"

var app             = express();

var daemonHandle    = null;
var dbHandle        = null;
// var gfs             = null

function start(){
    // catch ctrl+c so that open connections can be closed gracefully
    process.on("SIGINT", gracefulStop);

    // start mongo daemon
    startMongoD(
        // connect to database
        connect(function(db){
            console.log("connected");

            dbHandle    = db;
            // gfs         = gridFsStream dbHandle, mdb

            startApp();
        }, function(err){
            console.log(err);
        })
    );
}

function startMongoD(call){
    daemonHandle    = childProc.spawn("mongod");

    // listen to messages from mongod to determine when it has started
    daemonHandle.stdout
    .setEncoding("utf8")
    .on("data", function(data){
        // once it has started stop listening and trigger callback
        if (/waiting for connections on port/.test(data)){
            daemonHandle.stdout.removeListener("data", arguments.callee);
            call();
        }
    });
}

function gracefulStop(){
    // close db connection
    if (dbHandle != null)
        dbHandle.close();

    // close running programs
    if (daemonHandle != null)
        daemonHandle.kill();

    // close node
    process.exit();
}

function connect(successCall, errorCall){
    mdb.MongoClient.connect(
        "mongodb://" + DATABASE_URL,
        function(err, db){
            if (err != null){
                if (errorCall != null)
                    errorCall(err);
            }
            else {
                successCall(db);
            }
        }
    );
};

// findFiles       = (params, call)->
//     dbHandle
//     .collection "fs.files"
//     .find params
//     .toArray call

function allowCrossDomain(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

function getSendResCall(res){
    return function(err, results){
        res.send(err || results);
    }
}

function getIdErrorCall(res){
    return function(){
        res.status(404).send("Not a valid _id value");
    }
}

function tryGetId(hexString, successCall, errorCall){
    var idObj;

    try {
        idObj   = new mdb.ObjectID(hexString);
    }
    catch(e){
    }

    (idObj != null ? successCall : errorCall)(idObj);
}

function sessionIsValid(req){
    return (req.session.username != null);
}

function startApp(){
    // app.use bodyParser.raw limit:MAX_RAW_UPLOAD
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(session({
        secret:"secret string goes here",
        cookie:{
            maxAge:1000 * 60 * 30
        },
        httpOnly:false
    }));
    // app.use multer()
    app.use(allowCrossDomain);

    app.listen(1337);

    app.use("/dist", express.static("app/dist"));

    // add new entry
    app.post("/users", function(req, res){
        dbHandle
        .collection("users")
        .insertOne(req.body, function(err, results){
            if (err != null){
                res.send(err);
            }
            else {
                // add _id of created document to our response
                results.result._id  = results.insertedId
                res.send(results.result);
            }
        });
    });

    app.post("/login", function(req, res){
        var matches = dbHandle
        .collection("users")
        .find({
            "username":req.body.username,
            "password":req.body.password
        });

        matches
        .count()
        .then(function(count){
            if (count == 1){
                req.session.username    = req.body.username;
                res.send();
            }
            else {
                res.status(404).send("username or password incorrect");
            }
        });
    });

    // returns a json of all users
    app.get("/users", function(req, res){
        if (sessionIsValid(req)){
            dbHandle
            .collection("users")
            .find(
                {},
                { password:0 }
            )
            .toArray(getSendResCall(res));
        }
        else {
            res.status(404).send("not logged in");
        }
    });

    // updates the record with _id "id" with the values in the request
    app.patch("/users/:id", function(req, res){
        if (sessionIsValid(req)){
            delete(req.body._id);

            tryGetId(req.params.id,
                function(testId){
                    dbHandle
                    .collection("users")
                    .updateOne(
                        {
                            _id:testId,
                            // ensure that logged in user matches provided id
                            username:req.session.username
                        },
                        { $set:req.body },
                        function(err, results){
                            res.send(err || results);
                        }
                    );
                },
                getIdErrorCall(res)
            );
        }
        else {
            res.send("not logged in");
        }
    });

    // # returns a json for collection "name" filtered by id "id"
    // app.get "/:name/:id", (req, res)->
    //     tryGetId req.params.id,
    //         (testId)->
    //             dbHandle
    //             .collection req.params.name
    //             .find(
    //                 _id:testId
    //             )
    //             .toArray (err, results) ->
    //                 res.send err || results[0]
    //         , getIdErrorCall res

    // # inserts the posted json content into the collection "name"
    // app.post "/:name", (req, res)->
    //     dbHandle
    //     .collection req.params.name
    //     .insertOne req.body, (err, results) ->
    //         if err?
    //             res.send err
    //         else
    //             # add _id of created document to our response
    //             results.result._id  = results.insertedId
    //             res.send results.result

    // # updates the record with _id "id" in collection "name" with the values in
    // # the request
    // app.put "/:name/:id", (req, res)->
    //      delete req.body._id
    //      tryGetId req.params.id,
    //          (testId)->
    //              dbHandle
    //              .collection req.params.name
    //              .updateOne { _id:testId }, { $set:req.body },
    //                  (err, results) ->
    //                     dbHandle.collection req.params.name
    //                             .find(_id:testId)
    //                             .toArray (err, results) ->
    //                                 res.send err || results[0]
    //          , getIdErrorCall res
}

start();
