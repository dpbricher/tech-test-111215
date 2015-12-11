define([
    "marionette",
    "text!modules/home/templates/friend_item.xml"
], function(
    M,
    template
){
    return M.ItemView.extend({
        template:template,

        ui:{
            removeButton:"#remove"
        },

        triggers:{
            "click @ui.removeButton":"home:friend:remove"
        }
    });
});
