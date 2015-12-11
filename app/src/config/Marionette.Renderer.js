define([
    "marionette"
], function(
    M
){
    var mRender = M.Renderer.render;

    M.Renderer.render   = function(template, data){
        return mRender(_.template(template), data);
    };
});
