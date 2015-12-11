define([
    "backbone",
    "models/UserModel"
], function(
    BB,
    UserModel
){
    return BB.Collection.extend({
        url:"http://localhost:1337/users",
        model:UserModel
    });
});
