define([
    "backbone",
    "marionette",
    "modules/login/LoginController",
    "modules/create/CreateController",
    "modules/home/HomeController",
    "modules/update/UpdateController",
    "models/UserCollection",
    "text!layout.xml"
], function(
    BB,
    M,
    LoginController,
    CreateController,
    HomeController,
    UpdateController,
    UserCollection,
    layout
){
    return M.Application.extend({
        initialize:function(){
            // username of logged in user
            this.user       = null;

            this.collection = new UserCollection;

            this.router     = new M.AppRouter({
                appRoutes:{
                    "":"default",
                    "login":"login",
                    "create":"create",
                    "home":"home",
                    "update":"update"
                },

                controller:this
            });

            this.view       = new M.LayoutView({
                el:"#content-main",
                template:layout,
                regions:{
                    center:"#center"
                }
            });
        },

        onStart:function(){
            this.view.render();

            Backbone.history.start();
        },

        hasUser:function(){
            return (this.user != null);
        },

        // routes
        default:function(){
            Backbone.history.navigate("login", { trigger:true });
        },

        login:function(){
            this.login  = new LoginController({
                userCollection:this.collection
            });

            this.listenTo(this.login, "login:success", function(user){
                this.user   = user;

                Backbone.history.navigate("home", { trigger:true });
            });

            this.listenTo(this.login, "login:create", function(){
                Backbone.history.navigate("create", { trigger:true });
            });

            this.view.showChildView("center", this.login.getView());
        },

        create:function(){
            this.create     = new CreateController({
                userCollection:this.collection
            });

            this.listenTo(this.create, "create:cancel create:success",
                function(){
                    Backbone.history.navigate("login", { trigger:true });
                }
            );

            this.view.showChildView("center", this.create.getView());
        },

        home:function(){
            if (this.hasUser()){
                this.home   = new HomeController({
                    user:this.user,
                    userCollection:this.collection
                });

                this.listenTo(this.home, "home:update", function(){
                    Backbone.history.navigate("update", { trigger:true });
                });

                this.view.showChildView("center", this.home.getView());
            }
            else {
                Backbone.history.navigate("login", { trigger:true });
            }
        },

        update:function(){
            if (this.hasUser()){
                this.update = new UpdateController({
                    userCollection:this.collection,
                    user:this.user
                });

                this.listenTo(this.update, "update:cancel",
                    function(){
                        Backbone.history.navigate("home", { trigger:true });
                    }
                );

                this.listenTo(this.update, "update:success",
                    function(){
                        Backbone.history.navigate("login", { trigger:true });
                    }
                );

                this.view.showChildView("center", this.update.getView());
            }
            else {
                Backbone.history.navigate("login", { trigger:true });
            }
        }
    });
});
