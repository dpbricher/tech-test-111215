define([
    "marionette",
    "text!modules/home/templates/result_item.xml"
], function(
    M,
    template
){
    return M.ItemView.extend({
        template:template,

        ui:{
            addButton:"#add"
        },

        triggers:{
            "click @ui.addButton":"home:result:add"
        }
    });
});
