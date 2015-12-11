define([
    "marionette",
    "modules/home/views/FriendsView",
    "modules/home/views/ResultsView",
    "text!modules/home/templates/home.xml"
], function(
    M,
    FriendsView,
    ResultsView,
    template
){
    return M.LayoutView.extend({
        template:template,

        ui:{
            searchInput:"#search-input",
            updateButton:"#update-details"
        },

        regions:{
            "resultsList":"#results",
            "friendsList":"#friends-list"
        },

        triggers:{
            "click @ui.updateButton":"home:update"
        },

        events:{
            "keyup @ui.searchInput":function(je){
                var term    = this.ui.searchInput.val();

                if (term.length != 0)
                    this.resultsView.filter = function(item){
                        return (item.get("username").indexOf(term) != -1);
                    };
                else
                    delete this.resultsView.filter;

                this.resultsView.render();
            }
        },

        childEvents:{
            "home:result:add":function(view){
                this.trigger("home:add", view.model);
            },

            "home:friend:remove":function(view){
                this.trigger("home:remove", view.model);
            }
        },

        initialize:function(options){
            this.user   = options.user;
        },

        onBeforeShow:function(){
            this.resultsView    = new ResultsView({
                collection:this.collection
            });

            this.friendsView    = new FriendsView({
                collection:this.collection
            });

            this.friendsView.filter = function(){
                return false;
            };

            // TODO: find out why this only triggers once
            // this.listenTo(this.collection, "change",
                // this.updateFriendsView.bind(this));

            this.collection.fetch({
                success:function(){
                    this.updateFriendsView();
                }.bind(this)
            });

            this.showChildView("resultsList", this.resultsView);
            this.showChildView("friendsList", this.friendsView);
        },

        updateFriendsView:function(){
            // console.log("update!")
            var userModel   = this.getUserModel();

            if (userModel != null){
                var friendsList = userModel.get("friends");

                this.friendsView.filter = function(item){
                    return friendsList.indexOf(item.get("_id")) != -1;
                };

                this.friendsView.render();
            }
        },

        // TODO: unduplicate this (also in controller)
        getUserModel:function(){
            var matchedUsers    = this.collection.where({
                username:this.user
            });

            if (matchedUsers.length == 1)
                return matchedUsers[0];
            else
                return null;
        }
    });
});
