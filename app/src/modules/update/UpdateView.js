define([
    "marionette",
    "text!modules/update/template.xml"
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
            "click @ui.confirmButton":"update:confirm",
            "click @ui.cancelButton":"update:cancel"
        }
    });
});
