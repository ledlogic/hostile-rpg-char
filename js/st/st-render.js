/* st-render.js */

st.render = {
	$pageft: null,
	init: function() {
		st.log("init render");
		st.render.$pageft = $(".st-page .st-page-ft");
	},
	render: function() {
		st.log("rendering char");

		var that = st.render;
		
		that.renderReset();		
		that.renderOverview();
		that.renderAttributes();
		that.renderWork();
		that.renderSkills();
		
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		st.log("render reset");
		st.render.$pageft.html("");
	},
	renderAttributes: function() {
		st.log("rendering attributes");

		var profile = st.character.data.profile;
		var $attr = $("<div class=\"st-section st-attributes\"></div>");
		$attr.append("<div class=\"st-section-title\">Profile</div>");
		_.each(profile, function(map) {
			_.each(map, function(value, key) {
				//st.log(map);
				var hexValue = value.toString(16);
				var mod = st.character.dm(value);
				var modClass = st.render.modClass(mod);
				var h = "<span class=\"st-attribute-label\">" + key + "</span> "
				      + "<span class=\"st-attribute-value " + modClass + "\">" + hexValue + "</span>"
				      + "<span class=\"st-attribute-mod " + modClass + "\">[" + mod + "]</span>";
				var $elm = $("<span class=\"st-item st-attribute st-attribute-" + key + "\">" + h + "</span>");
				$attr.append($elm);
			});
		});
		st.render.$pageft.append($attr);
		
	    $(".st-attribute-label").lettering();
	},
	modClass: function(mod) {
		var ret = "";
		switch(true) {
			case (mod == 0):
				ret = "st-mid-attr";
			    break;
			case (mod < 0):
				ret = "st-low-attr";
			    break;
			case (mod > 0):
				ret = "st-high-attr";
			    break;
		}
		return ret;	
	},
	renderOverview: function() {
		st.log("rendering overview");

		var meta = st.character.data.meta;
		var $overview = $("<div class=\"st-section st-overview\"></div>");
		$overview.append("<div class=\"st-section-title\">Personal</div>");

		_.each(meta, function(map) {
			_.each(map, function(value, key) {
				//st.log(map);
				var h = "<span class=\"st-overview-label\">" + key + "</span> "
				      + "<span class=\"st-overview-value\">" + value + "</span>";
				if (h.indexOf(",") > -1) {
					h = h.split(",");
					h = h.join("<br/>");
				}
				if (!h) {
					h = "&nbsp;";
				}
				var $elm = $("<span class=\"st-item st-overview-item st-overview-item-" + key + "\">" + h + "</span>");
				$overview.append($elm);
			});
		});
		st.render.$pageft.append($overview);
	},
	renderSkills: function() {
		st.log("rendering skills");

		var skills = st.character.data.skills;		
		var $skills = $("<div class=\"st-section st-skills\"></div>");
		$skills.append("<div class=\"st-section-title\">Skills</div>");
		
		_.each(skills, function(map) {
			_.each(map, function(value, key) {
				//st.log(map);
				var h = "<span class=\"st-skill-item-key\">" + key + "</span> "
				      + "<span class=\"st-skill-item-stat\">" + value + "</span>";
				var $elm = $("<span class=\"st-skill st-skill-item st-skill-item-" + key + "\">" + h + "</span>");
				$skills.append($elm);
			});
		});
		st.render.$pageft.append($skills);
	},
	renderWork: function() {
		st.log("rendering work");

		var work = st.character.data.work;		
		//st.log(work);
		var $work = $("<div class=\"st-section st-work\"></div>");
		$work.append("<div class=\"st-section-title\">Work History</div>");

		var h = "<span class=\"st-skill-item-key\">Position</span> "
		      + "<span class=\"st-skill-item-stat\">Years</span>";
		var $elm = $("<span class=\"st-skill st-skill-item\">" + h + "</span>");
		$work.append($elm);
						
		_.each(work, function(map) {
			_.each(map, function(value, key) {
				//st.log(map);
				var h = "<span class=\"st-skill-item-key\">" + key + "</span> "
				      + "<span class=\"st-skill-item-stat\">" + value + "</span>";
				var $elm = $("<span class=\"st-skill st-skill-item st-skill-item-" + key + "\">" + h + "</span>");
				$work.append($elm);
			});
		});
		st.render.$pageft.append($work);
	}
};