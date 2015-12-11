requirejs.config({
	paths:{
		"backbone":"backbone-1.2.3",
		"jquery":"jquery-1.11.3",
		"marionette":"marionette-2.4.3",
		"text":"require-text-2.0.14",
		"underscore":"underscore-1.8.3"
	}
});

require([
	"app",
	"config/Marionette.Renderer"
], function(
	App
){
	new App().start();
});
