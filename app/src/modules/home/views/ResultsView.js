define([
    "marionette",
    "modules/home/views/ResultItemView"
], function(
    M,
    ResultItemView
){
    return M.CollectionView.extend({
        childView:ResultItemView
    });
});
