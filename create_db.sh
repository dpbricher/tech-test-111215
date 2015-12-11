#!/usr/bin/env bash

DATABASE_NAME="dbUsers"

# insert sample data
mongoimport --db "$DATABASE_NAME" \
        --collection "users" \
        --file "example-data.json" \
        --jsonArray \
        --drop

# set unique fields
mongo "$DATABASE_NAME" < <(echo \
    "
    db.users.createIndex({"email":1},{unique:true});
    db.users.createIndex({"username":1},{unique:true});
    "
)
