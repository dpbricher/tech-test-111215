define([
    "marionette",
    "modules/home/views/FriendItemView"
], function(
    M,
    FriendItemView
){
    return M.CollectionView.extend({
        childView:FriendItemView
    });
});
