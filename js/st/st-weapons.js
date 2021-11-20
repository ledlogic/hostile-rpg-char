/* st-weapons.js */

st.weapons = {
	
	init: function() {
		st.log("init weapons");
		st.weapons.loadWeaponsCsv();
	},
	
	loadWeaponsCsv: function(uri) {
		st.log("loading char from csv, uri[" + uri + "]");
		
		Papa.parse("csv/st-weapons.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.weapons.charResponse(d);
			},
			encoding: "UTF-8"
		});
	},
	
	charResponse: function(d) {
		st.log("char response");
		
		var fields = d.meta.fields;
		var data = d.data;
		
		st.log(fields);
		st.log(data);
		
	},

};