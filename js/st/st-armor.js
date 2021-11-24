/* st-armor.js */

st.armor = {
	
	init: function() {
		st.log("init equipment");
		st.armor.request();
	},
	
	request: function(uri) {
		st.log("requesting armor from csv, uri[" + uri + "]");
		
		Papa.parse("csv/st-armor.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.armor.response(d);
			},
			encoding: "UTF-8"
		});
	},
	
	response: function(d) {
		st.log("armor response");
		
		var fields = d.meta.fields;
		var data = d.data;
		st.armor.fields = fields;
		st.armor.data = data;
	}

};