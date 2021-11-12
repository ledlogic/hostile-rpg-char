/* st-char.js */

st.character = {
	spec: {},
	relStat: {},
	init: function() {
		st.log("init character");
	},
	loadChar: function(uri) {
		st.log("loading char uri[" + uri + "]");
		uri = "./js/char/" + uri;
		if (uri.indexOf(".json") > -1) {
			st.character.loadCharJson(uri);
		}
	},
	loadCharJson: function(uri) {
		st.log("loading char from json, uri[" + uri + "]");
		$.ajax(uri+"?" + (new Date()).getTime())
			.done(function(data, status, jqxhr) {
				st.character.data = data;
				//st.log(["data", data]);
				setTimeout(st.render.render, 10);
			})
			.fail(function() {
				alert("Error: unable to load character.");
			})
			.always(function() {
			});
	},
	dm: function(attribute) {
		return Math.floor((attribute-1)/3-2);
	}
};