define([
    "marionette",
    "text!modules/login/template.xml"
], function(
    M,
    template
){
    return M.ItemView.extend({
        template:template,

        ui:{
            "userInput":"> #userInput",
            "passInput":"> #passInput",
            "loginButton":"> #login",
            "createButton":"> #new"
        },

        triggers:{
            "click @ui.loginButton":"login:login",
            "click @ui.createButton":"login:create"
        }
    });
});
