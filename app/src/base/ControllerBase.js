define([
    "marionette"
], function(
    M
){
    return M.Object.extend({
        initialize:function(options){
            this.userCollection = options.userCollection;
        },

        getView:function(){
            if (this.view == null)
                throw new Error("this.view not set");

            return this.view;
        }
    });
});
