define([
    "marionette",
    "base/ControllerBase",
    "modules/update/UpdateView"
], function(
    M,
    ControllerBase,
    UpdateView
){
    return ControllerBase.extend({
        initialize:function(options){
            ControllerBase.prototype.initialize.call(this, options);

            this.user       = options.user;

            this.userModel  = this.userCollection.where({
                username:this.user
            })[0];

            this.view   = new UpdateView({
                model:this.userModel
            });

            this.listenTo(this.view, "update:cancel", function(){
                this.trigger("update:cancel");
            });

            this.listenTo(this.view, "update:confirm",
                this.updateUser.bind(this));
        },

        // determines if the confirmed password matches the original
        validatePasswords:function(){
            return (this.view.ui.passInput.val() ==
                this.view.ui.confirmInput.val());
        },

        updateUser:function(){
            if (this.validatePasswords()){
                var updateAttributes    = {};

                var username    = this.view.ui.userInput.val();
                var password    = this.view.ui.passInput.val();
                var fullname    = this.view.ui.fullInput.val();
                var email       = this.view.ui.emailInput.val();

                if (username.length != 0)
                    updateAttributes.username   = username;

                if (fullname.length != 0)
                    updateAttributes.fullname   = fullname;

                if (email.length != 0)
                    updateAttributes.email      = email;

                if (password.length != 0)
                    updateAttributes.password   = password;

                if (!_.isEmpty(updateAttributes)) {
                    var result  = this.userModel.save(updateAttributes, {
                        patch:true
                    });

                    if (!result) {
                        alert("failed to create a new user:\n\n" +
                            model.validationError);
                    }
                    else {
                        this.trigger("update:success");
                    }
                }
            }
            else {
                alert("The values of the Password and Confirm Password" +
                    " fields do not match");
            }
        }

        // addUser:function(){
        //     var model   = this.userCollection.add({
        //         username:this.view.ui.userInput.val(),
        //         password:this.view.ui.passInput.val(),
        //         fullname:this.view.ui.fullInput.val(),
        //         email:this.view.ui.emailInput.val(),
        //         friends:[]
        //     });
        //
        //     var result  = model.save();
        //
        //     if (!result) {
        //         alert("failed to create a new user:\n\n" +
        //             model.validationError);
        //     }
        //     else {
        //         this.trigger("create:success");
        //     }
        // }
    });
});
