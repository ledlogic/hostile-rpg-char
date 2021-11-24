/* st-weapons.js */

st.weapons = {
	
	init: function() {
		st.log("init weapons");
		st.weapons.request();
	},
	
	request: function(uri) {
		st.log("requesting weapons from csv, uri[" + uri + "]");
		
		Papa.parse("csv/st-weapons.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.weapons.response(d);
			},
			encoding: "UTF-8"
		});
	},
	
	response: function(d) {
		st.log("weapons response");

		var fields = d.meta.fields;
		var data = d.data;
		st.weapons.fields = fields;
		st.weapons.data = data;
	}

};