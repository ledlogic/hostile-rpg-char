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
		
		$(".st-page").removeClass("st-initial-state");
	},
	renderReset: function() {
		st.log("render reset");
		st.render.$pageft.html("");
	},
	renderAttributes: function() {
		st.log("rendering attributes");

		var profile = st.character.data.profile;

		// attr
		var $attr = $("<div class=\"st-section st-attributes\"></div>");
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
		//st.log(["meta", meta]);

		// page
		var $overview = $("<div class=\"st-section st-overview\"></div>");
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

		var spec = st.character.spec;
		var skills = spec.skills;
		
		// there are three sets of skills, to match the display
		for (var i=0;i<3;i++) {
			var skillsI = skills[i];
			var y = 20;
			var title = (i===0) ? "Skills" : "";
			var $skillsI = $("<div class=\"st-section st-skills st-skills-" + i + "\"><span class=\"st-skills-title st-item\">" + title + "</span></div>");
			_.each(skillsI, function(value, key) {
				var h = value + "";
				if (!h) {
					h = "&nbsp;"
				}
				var elm = "";
				var classKey = key;
				var dispKey = _.capitalize2(key.replace(/-/g, ' '));
				
				var stat = st.character.relStat[key].value;
				//st.log(st.character.relStat);

				var hclass = st.render.calcSkillClass(h);
				
				if (dispKey) {
					elm += ("<span class=\"st-item st-skill-item-key st-skill-item-key-" + classKey + " " + hclass + "\""
							+" style=\"top: " + y + "px\""
							+">" + dispKey + "</span>");
				}
				elm += ("<span class=\"st-item st-skill-item-stat st-skill-item-" + key + " " + hclass + "\""
						+" style=\"top: " + y + "px\""
						+">" + stat + "</span>");

				elm += ("<span class=\"st-item st-skill-item st-skill-item-" + key + " " + hclass + "\""
						+" style=\"top: " + y + "px\""
						+">" + h + "</span>");
				
				$skillsI.append(elm);
				y += 20;
			});
			st.render.$pageft.append($skillsI);
		}		
	}
};