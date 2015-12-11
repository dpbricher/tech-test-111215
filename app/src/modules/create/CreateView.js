define([
    "marionette",
    "text!modules/create/template.xml"
], function(
    M,
    template
){
    return M.ItemView.extend({
        template:template,

        ui:{
            "userInput":"#user-input",
            "fullInput":"#full-input",
            "emailInput":"#email-input",
            "passInput":"#pass-input",
            "confirmInput":"#confirm-input",
            "confirmButton":"#confirm-button",
            "cancelButton":"#cancel-button"
        },

        triggers:{
            "click @ui.confirmButton":"create:confirm",
            "click @ui.cancelButton":"create:cancel"
        }
    });
});
