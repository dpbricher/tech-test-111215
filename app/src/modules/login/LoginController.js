define([
    "marionette",
    "base/ControllerBase",
    "modules/login/LoginView"
], function(
    M,
    ControllerBase,
    LoginView
){
    return ControllerBase.extend({
        initialize:function(options){
            ControllerBase.prototype.initialize.call(this, options);

            this.view   = new LoginView;

            this.listenTo(this.view, "login:login", function(){
                var user    = this.view.ui.userInput.val();
                var pass    = this.view.ui.passInput.val();

                $.ajax({
                    data:{
                        username:user,
                        password:pass
                    },
                    method:"post",
                    url:"http://localhost:1337/login",
                    success:function(){
                        this.trigger("login:success", user);
                    }.bind(this),
                    error:function(){
                        this.trigger("login:fail");
                    }.bind(this)
                });
            });

            this.listenTo(this.view, "login:create", function(){
                this.trigger("login:create");
            });
        }
    });
});
