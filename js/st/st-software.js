/* st-software.js */

st.software = {
	
	init: function() {
		st.log("init software");
		st.software.request();
	},
	
	request: function(uri) {
		st.log("requesting software from csv, uri[" + uri + "]");
		
		Papa.parse("csv/st-software.csv", {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				st.software.response(d);
			},
			encoding: "UTF-8"
		});
	},
	
	response: function(d) {
		st.log("software response");
		
		var fields = d.meta.fields;
		var data = d.data;
		st.software.fields = fields;
		st.software.data = data;
	}

};