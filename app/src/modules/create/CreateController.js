define([
    "marionette",
    "base/ControllerBase",
    "modules/create/CreateView"
], function(
    M,
    ControllerBase,
    CreateView
){
    return ControllerBase.extend({
        initialize:function(options){
            ControllerBase.prototype.initialize.call(this, options);

            this.view   = new CreateView;

            this.listenTo(this.view, "create:cancel", function(){
                this.trigger("create:cancel");
            });

            this.listenTo(this.view, "create:confirm", function(){
                if (this.validatePasswords()){
                    this.userCollection.fetch({
                        success:this.addUser.bind(this),
                        error:function(){
                            console.error("error adding new user");
                        }
                    });
                }
                else {
                    alert("The values of the Password and Confirm Password" +
                        " fields do not match");
                }
            });
        },

        // determines if the confirmed password matches the original
        validatePasswords:function(){
            return (this.view.ui.passInput.val() ==
                this.view.ui.confirmInput.val());
        },

        addUser:function(){
            var model   = this.userCollection.add({
                username:this.view.ui.userInput.val(),
                password:this.view.ui.passInput.val(),
                fullname:this.view.ui.fullInput.val(),
                email:this.view.ui.emailInput.val(),
                friends:[]
            });

            var result  = model.save();

            if (!result) {
                alert("failed to create a new user:\n\n" +
                    model.validationError);
            }
            else {
                this.trigger("create:success");
            }
        }
    });
});
