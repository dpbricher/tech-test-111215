define([
    "marionette",
    "base/ControllerBase",
    "modules/home/views/HomeView"
], function(
    M,
    ControllerBase,
    HomeView
){
    return ControllerBase.extend({
        initialize:function(options){
            ControllerBase.prototype.initialize.call(this, options);

            this.user   = options.user;

            this.view   = new HomeView({
                collection:this.userCollection,
                user:this.user
            });

            this.listenTo(this.view, "home:update", function(){
                this.trigger("home:update");
            });

            this.listenTo(this.view, "home:add", function(model){
                var userModel   = this.getUserModel();

                if (userModel != null){
                    userModel.addFriend(model.get("_id"));
                    this.view.updateFriendsView();
                }
            });

            this.listenTo(this.view, "home:remove", function(model){
                var userModel   = this.getUserModel();

                if (userModel != null){
                    userModel.removeFriend(model.get("_id"));
                    this.view.updateFriendsView();
                }
            });
        },

        getUserModel:function(){
            var matchedUsers    = this.userCollection.where({
                username:this.user
            });

            if (matchedUsers.length == 1)
                return matchedUsers[0];
            else
                return null;
        }
    });
});
