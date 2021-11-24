/* st-equipment.js */

st.equipment = {
	
	init: function() {
		st.log("init equipment");
		st.equipment.request();
	},
	
	request: function(uri) {
		st.log("requesting equipment from csv, uri[" + uri + "]");
		
		Papa.parse("csv/st-equipment.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.equipment.response(d);
			},
			encoding: "UTF-8"
		});
	},
	
	response: function(d) {
		st.log("equipment response");
		
		var fields = d.meta.fields;
		var data = d.data;
		st.equipment.fields = fields;
		st.equipment.data = data;
	}

};