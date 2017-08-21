process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//require('ssl-root-cas').inject()

var gui = require('nw.gui'),
	http = require('http'),
	debug = false;


// Get the current window
var icons = {
	hegrenade: "files/img/hg.png",
	molotov: "files/img/molotov.png",
	flashbang: "files/img/flashbang.php",
	decoy: "files/img/decoy.png",
	smokegrenade: "files/img/smoke.png",
	incgrenade: "files/img/ctmolotv.png",

    cz75a: "http://vignette3.wikia.nocookie.net/cswikia/images/c/cf/C75a_hud_csgo.png/revision/latest/scale-to-width-down/400",
    deagle: "http://vignette2.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png/revision/latest/scale-to-width-down/400",
    elite: "http://vignette2.wikia.nocookie.net/cswikia/images/8/82/Elite_hud_csgo.png/revision/latest/scale-to-width-down/400",
    fiveseven: "http://vignette2.wikia.nocookie.net/cswikia/images/9/9c/Fiveseven_hud_csgo.png/revision/latest/scale-to-width-down/400",
    glock: "http://vignette2.wikia.nocookie.net/cswikia/images/3/33/Glock18_hud_csgo.png/revision/latest/scale-to-width-down/400",
    p250: "http://vignette2.wikia.nocookie.net/cswikia/images/5/57/P250_hud.png/revision/latest/scale-to-width-down/400",
    hkp2000: "http://vignette1.wikia.nocookie.net/cswikia/images/6/67/Hkp2000_hud.png/revision/latest/scale-to-width-down/400",
    tec9: "http://vignette3.wikia.nocookie.net/cswikia/images/5/55/Tec9_hud_csgo.png/revision/latest/scale-to-width-down/400",
    usp_silencer: "http://vignette2.wikia.nocookie.net/cswikia/images/7/73/Usps_hud_csgo.png/revision/latest/scale-to-width-down/400",
    mag7: "http://vignette2.wikia.nocookie.net/cswikia/images/2/2e/Mag7_hud_csgo.png/revision/latest/scale-to-width-down/400",
    revolver: "http://vignette2.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png/revision/latest/scale-to-width-down/400",
    nova: "http://vignette4.wikia.nocookie.net/cswikia/images/c/c8/Nova_hud_csgo.png/revision/latest/scale-to-width-down/400",
    sawedoff: "http://vignette1.wikia.nocookie.net/cswikia/images/9/94/Sawedoff_hud_csgo.png/revision/latest/scale-to-width-down/400",
    xm1014: "http://vignette2.wikia.nocookie.net/cswikia/images/a/ad/Xm1014_hud_csgo.png/revision/latest/scale-to-width-down/400",
    mac10: "http://vignette2.wikia.nocookie.net/cswikia/images/f/f7/Mac10_hud_csgo.png/revision/latest/scale-to-width-down/400",
    mp7: "http://vignette4.wikia.nocookie.net/cswikia/images/8/8d/Mp7_hud_csgo.png/revision/latest/scale-to-width-down/400",
    mp9: "http://vignette2.wikia.nocookie.net/cswikia/images/1/14/Mp9_hud_csgo.png/revision/latest/scale-to-width-down/400",
    p90: "http://vignette3.wikia.nocookie.net/cswikia/images/b/bd/P90_hud_csgo.png/revision/latest/scale-to-width-down/400",
    bizon: "http://vignette1.wikia.nocookie.net/cswikia/images/d/d5/Bizon_hud_csgo.png/revision/latest/scale-to-width-down/400",
    ump45: "http://vignette3.wikia.nocookie.net/cswikia/images/c/c4/Ump45_hud_csgo.png/revision/latest/scale-to-width-down/400",
    ak47: "http://vignette1.wikia.nocookie.net/cswikia/images/7/76/Ak47_hud_csgo.png/revision/latest/scale-to-width-down/400",
    aug: "http://vignette2.wikia.nocookie.net/cswikia/images/6/6f/Aug_hud_csgo.png/revision/latest/scale-to-width-down/400",
    famas: "http://vignette2.wikia.nocookie.net/cswikia/images/8/8f/Famas_hud_csgo.png/revision/latest/scale-to-width-down/400",
    galilar: "http://vignette1.wikia.nocookie.net/cswikia/images/4/4a/Galilar_hud.png/revision/latest/scale-to-width-down/400",
    m4a1_silencer: "http://vignette3.wikia.nocookie.net/cswikia/images/4/4f/M4a1s_hud_csgo.png/revision/latest/scale-to-width-down/400",
    m4a1: "http://vignette2.wikia.nocookie.net/cswikia/images/d/d9/M4a4_hud.png/revision/latest/scale-to-width-down/400",
    sg556: "http://vignette1.wikia.nocookie.net/cswikia/images/9/9b/Sg556_hud_csgo.png/revision/latest/scale-to-width-down/400",
    awp: "http://vignette3.wikia.nocookie.net/cswikia/images/e/eb/Awp_hud_csgo.png/revision/latest/scale-to-width-down/400",
    g3sg1: "http://vignette4.wikia.nocookie.net/cswikia/images/4/4a/G3sg1_hud_csgo.png/revision/latest/scale-to-width-down/400",
    ssg08: "http://vignette4.wikia.nocookie.net/cswikia/images/3/3c/Ssg08_hud_csgo.png/revision/latest/scale-to-width-down/400",
    scar20: "http://vignette4.wikia.nocookie.net/cswikia/images/c/c9/Scar20_hud_csgo.png/revision/latest/scale-to-width-down/400",
    m249: "http://vignette2.wikia.nocookie.net/cswikia/images/e/ea/M249_hud_csgo.png/revision/latest/scale-to-width-down/400",
    negev: "http://vignette2.wikia.nocookie.net/cswikia/images/b/be/Negev_hud.png/revision/latest/scale-to-width-down/400",
	knife: "http://vignette2.wikia.nocookie.net/cswikia/images/4/4b/Knife_ct_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
   	knife_t: "http://vignette3.wikia.nocookie.net/cswikia/images/2/28/Knife_t_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
   	knife_bayonet: "http://vignette2.wikia.nocookie.net/cswikia/images/2/28/Csgo_knife_Bayonet.png/revision/latest/scale-to-width-down/400",
    knife_butterfly: "http://vignette2.wikia.nocookie.net/cswikia/images/d/df/Knife_butterfly_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_falchion: "http://vignette4.wikia.nocookie.net/cswikia/images/7/7e/Falchion_Knife_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_flip: "http://vignette3.wikia.nocookie.net/cswikia/images/a/a4/Knife_flip_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_gut: "http://vignette2.wikia.nocookie.net/cswikia/images/f/ff/Knife_gut_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_tactical: "http://vignette2.wikia.nocookie.net/cswikia/images/5/53/Knife_hustman_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_karambit: "http://vignette4.wikia.nocookie.net/cswikia/images/5/57/Knife_karambit_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_m9_bayonet: "http://vignette4.wikia.nocookie.net/cswikia/images/d/d3/Csgo_knife_M9_Bayonet.png/revision/latest/scale-to-width-down/400",
    knife_shadow_dagger: "http://vignette4.wikia.nocookie.net/cswikia/images/f/f1/Knife_push_hud_outline_csgo.png/revision/latest/scale-to-width-down/400",
    knife_survival_bowie: "https://vignette4.wikia.nocookie.net/cswikia/images/8/8c/Survival_bowie_hud_outline.png/revision/latest/scale-to-width-down/400"

}
var win = gui.Window.get();
win.width = screen.width;
win.height = screen.height;
win.setAlwaysOnTop(true);

server = http.createServer(function (req, res) {

	if (req.method == 'POST') {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			if (!!debug) {
				console.debug("POST payload: " + body);
			}
			update(JSON.parse(body));
			res.end('');
		});

	} else {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.end("Nothing to see here!");
	}

});
var slotted = [];
var meth = {
	getPlayers: function(){
		if(this.info.allplayers){
			return this.info.allplayers
		}
		return false;
	},
	getCT: function(){
		var all_players = [];
		var ret = {
			players: []
		};
		if(this.info.map && this.info.map.team_ct){
			ret = $.extend({}, ret, this.info.map.team_ct);
		} else {
			return false;
		}
		for(var psid in this.getPlayers()){
			var curpl = this.getPlayers()[psid];
			if(curpl.team.toLowerCase() == "ct"){
				all_players.push(curpl);
			}
		}
		ret.players = all_players;
		return ret;
	},
	getT: function(){
		var all_players = [];
		var ret = {
			players: []
		};
		if(this.info.map && this.info.map.team_t){
			ret = $.extend({}, ret, this.info.map.team_t);
		}
		for(var psid in this.getPlayers()){
			var curpl = this.getPlayers()[psid];
			if(curpl.team.toLowerCase() == "t"){
				all_players.push(curpl);
			}
		}
		ret.players = all_players;
		return ret;
	},
	getObserved: function(){
		if(this.info.player.steamid != 1){
			var csid = this.info.player.steamid;
			var cur_player = this.getPlayers()[csid];
			if(cur_player){
				cur_player.steamid = csid;
				return cur_player;
			}
			//if(this.getPlayers()[csid]) return this.getPlayers()[csid];
			return false;
		}
		return this.info.player;
	},
	getPlayer: function(slot){
		slot = parseInt(slot);
		if(slot >= 0 && slot <= 10) return slotted[slot];
		return false;
	},
	phase: function(){
		if(this.info.phase_countdowns) return this.info.phase_countdowns;
		return false;
	},
	round: function(){
		if(this.info.round) return this.info.round;
		return false;
	},
	map: function(){
		if(this.info.map) return this.info.map;
		return false;
	},
	previously: function(){
		if(this.info.previously) return this.info.previously;
		return false;
	}
}
var integ = {
	info: {},
	extra: {}
};

var last_added = [];

function update(json) {
	integ.info = json;
	integ = $.extend({}, meth, integ);
	if(integ.getPlayers() !== false){
		for(var k in integ.getPlayers()){
			slotted[integ.getPlayers()[k].observer_slot] = integ.getPlayers()[k];
			integ.getPlayers()[k].getState = function(){
				return this.state;
			};
			integ.getPlayers()[k].getWeapons = function(){
				return this.weapons;
			};
			integ.getPlayers()[k].getCurrentWeapon = function(){
				var temp_weapons = this.getWeapons();
				if(temp_weapons !== false){
					for(var k in temp_weapons){
						if(temp_weapons[k].state == "active"){
							return temp_weapons[k];
						}
					}
				}
			};
			integ.getPlayers()[k].getGrenades = function(){
				var grenades = [];
				var temp_weapons = this.getWeapons();
				if(temp_weapons !== false){
					for(var k in temp_weapons){
						if(temp_weapons[k].type == "Grenade"){
							grenades.push(temp_weapons[k]);
						}
					}
					return grenades;
				}
			};
			integ.getPlayers()[k].getStats = function(){
				var temp_stats = $.extend({}, this.match_stats, this.state);
				return temp_stats;
			};
		}
	}
	updatePage(integ);
}


var klt = (3.5/31)*1000;
function showFlash(obs, kl, kcl){
	klt = klt*(kcl/255);
	$("#flash_player" + obs).html('<img src="FLASHES/' + kl + '.png"/>');
	setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      kl--;                     //  increment the counter
      if (kl > 0) {            //  if the counter < 10, call the loop function
         showFlash(obs, kl, kcl);             //  ..  again which will trigger another
      } else {
		  $("#flash_player" + obs).html('');
	  }                        //  ..  setTimeout()
   }, klt)
}

var titles = [
	// ["0", "SEMIFINAL 2 - BO3", "0"],
	// ["68%", "CSGOLOUNGE ODDS", "32%"],
	// ["86%", "WIN RATE", "14%"]
]

// REMOVE ME
var wh = 1;
function changeTransparent(){
	setTimeout(function () {
		$("#match_tournament").fadeTo(500,0);
		setTimeout(function(){
			$("#match_info").html(titles[wh][1]);
			$("#match_one_info").html(titles[wh][0]);
			$("#match_two_info").html(titles[wh][2]);
			$("#match_tournament").fadeTo(500,1);
		}, 500);
		wh++;
		if(wh == titles.length){
			wh = 0;
		}
		changeTransparent();
   	}, 20000)
}
changeTransparent();
var givedrops = false;
// REMOVE ME
function changeDropsAndViews(){
	setTimeout(function () {
		var newViewers = Math.floor((Math.random() * 50) + 50);
		var newDrops = Math.floor((Math.random() * 5) + 2);

		var oldv = parseInt($("#live-viewers").html());
		newViewers = (oldv + newViewers);

		if(givedrops){
			var oldd = parseInt($("#live-drops").html());
			if(oldd != 0){
				newDrops = (oldd + newDrops);
			}

			$("#live-drops").html(newDrops);
		}
		$("#live-viewers").html(newViewers);
		changeDropsAndViews();
   	}, 1000)
}
changeDropsAndViews();

//SOME other weird vars
var wasflash = [];
var probe = "";
var adr_g = 0;
var adr_r = 0;
var left = "CT";
var right = "T";
var testd = [];
var start_money = [];
var bestadr = 0;
var adr_p = [];
var changed = false;

function updatePage(data) {
	var observed = data.getObserved();
var obs_stats = observed.getStats();
	var phase = data.phase();
	if(observed.steamid == 1 || data.info.player.activity != "playing"){
		$("#player-container").css("opacity", "0");
	} else {
		var obs_stats = observed.getStats();
		if(phase.phase == "freezetime" || phase.phase == "intermission"){

		} else {
			$("#player-container").css("opacity", "1");
		}
	}

	var players = data.getPlayers();
	var round = data.round();
	var map = data.map();
	var round_now = map.round+1;

	var team_ct = data.getCT();
	var team_t = data.getT();

	var tname = [];
	var tscore = []
	//tname.ct = team_ct.name;
	//tname.t = team_t.name;
	tname.ct = "COUNTER TERRORISTS";
	tname.t = "TERRORISTS";
	//tname.ct = map.team_ct.name;
	//tname.t = map.team_t.name;
	tscore.ct = team_ct.score;
	tscore.t = team_t.score;

	$("#round_counter").html("Round " + round_now + " / 30");

	//OBSERVED PLAYER

	if(observed.steamid != 1){
		$("#kills_count").html(obs_stats.kills);
		$("#assist_count").html(obs_stats.assists);
		$("#death_count").html(obs_stats.deaths);
	}


	if(observed.team){
		switch (observed.team) {
		case "T":
			$("#second_row").css("background", "linear-gradient(to left, rgba(193,149,17,0), rgba(193,149,17,1))");
			$("#current_nick").css("color", "#c19511");
			break;
		case "CT":
			$("#second_row").css("background", "linear-gradient(to left, rgba(87,136,168,0), rgba(87,136,168,1))");
			$("#current_nick").css("color", "#5788a8");
			break;
		default:
			break;
		}
	}

	$("#nades").html("");
	if(observed.name){
		$("#current_nick").html(observed.name)
		// $("#nick_also").html(observed.name + " WAT");
	}
	if(observed.steamid != 1){


		var wep = observed.weapons;


		for (var key in wep) {
			var weapon = wep[key];
			if (weapon.type == "Grenade") {
				for(var x = 0; x < weapon.ammo_reserve; x++){
					$("#nades").append("<img src='" + weapon.name + ".png' style='height: 35px; max-height: 35px; width:auto; filter: invert(100%); float:right; margin-right:10px;'/>");
				}
			}
			if (weapon.state == "active" || weapon.state == "reloading") {
				if (weapon.type == "Grenade" || weapon.type == "C4" || weapon.type == "Knife" || obs_stats.health == 0) {

					$(".clip").html("");
					$(".reserve").html("");
				} else {
					$(".clip").html(weapon.ammo_clip+"/");
				$(".reserve").html(weapon.ammo_reserve);
				}

			}

		}
		$("#armor-text").html(obs_stats.armor);
		$("#health-text").html(obs_stats.health);
		if(obs_stats.helmet){
			$("#armor-text").css("background-image", "url('helmet.png')")
		} else {
			$("#armor-text").css("background-image", "url('armor.png')")
		}
	}

	//EVERY OTHER PLAYER
	if(players){
		//Some weird vars
		var team_money = [];
		var eq_money = [];
		var added = [];
		added.first = added.sec = team_money.first = team_money.sec = eq_money.first = eq_money.sec = 0;

		for(var steamid in players){
			probe = steamid;
			var player = players[steamid];
			var obs_sl = player.observer_slot;

			var stats = player.getStats();
			var weapons = player.getWeapons();

			var side = (obs_sl >=1 && obs_sl <= 5) ? "ct" : "t";
			var real_side = player.team.toLowerCase();

			var side_color = (real_side == "ct") ? "#5788a8" : "#c19511";
			var health_color = ((stats.health <= 20) ? "#e74c3c" : side_color);

			//BEING FLASHED
			if(wasflash[steamid] === undefined){
				wasflash[steamid] = false;
			}

			if(stats.flashed == 0){
				wasflash[steamid] = 0;
			} else {
				if(!wasflash[steamid] || stats.flashed > wasflash[steamid]){
					showFlash(obs_sl, 31, stats.flashed);
					wasflash[steamid] = stats.flashed;
				}
			}
			//COLORS
			if(obs_sl >= 1 && obs_sl <= 5){

				if(real_side == "ct"){
					$(".round_team_1_name").html(tname.ct);
					$(".round_team_2_name").html(tname.t);
					$(".round_team_1_name").css("color", "#5788a8");
					$(".round_team_2_name").css("color", "#c19511");
					$("#team_2").css("color", "#c19511");
					$("#team_1").css("color", "#5788a8");
					$(".st_left .adr_bar").css("background", "linear-gradient(to left, #3498db, #5788a8)");
					$(".st_right .adr_bar").css("background", "linear-gradient(to left, #c19511, #f7bf16)");
					$("#team_1 #team_name").html(tname.ct);
					$("#team_1 #team_score").html(team_ct.score);
					$("#team_2 #team_name").html(tname.t);
					$("#team_2 #team_score").html(team_t.score);
				} else {
					$(".round_team_1_name").html(tname.t);
					$(".round_team_2_name").html(tname.ct);
					$(".round_team_2_name").css("color", "#5788a8");
					$(".round_team_1_name").css("color", "#c19511");
					$("#team_1").css("color", "#c19511");
					$("#team_2").css("color", "#5788a8");
					$(".st_right .adr_bar").css("background", "linear-gradient(to left, #3498db, #5788a8)");
					$(".st_left .adr_bar").css("background", "linear-gradient(to left, #c19511, #f7bf16)");
					$("#team_2 #team_name").html(tname.ct);
					$("#team_1 #team_score").html(team_ct.score);
					$("#team_1 #team_name").html(tname.t);
					$("#team_1 #team_score").html(team_t.score);
				}
				team_money.first += stats.money;
				eq_money.first += stats.equip_value;
				added.first += 1;
				if(added.first >= 5){
					$("#team_money_1").html("$" + team_money.first);
					$("#eq_money_1").html("$" + eq_money.first);
					//$("#team_1 #team_name").html(team_ct.name);
					//$("#team_1 #team_score").html(tscore[left.toLowerCase()]);

				}
			}else if((obs_sl >= 6 && obs_sl <= 10) || obs_sl == 0) {
				if(real_side != "ct"){
					$(".round_team_1_name").html(tname.ct);
					$(".round_team_2_name").html(tname.t);
					$(".round_team_1_name").css("color", "#5788a8");
					$(".round_team_2_name").css("color", "#c19511");
					$("#team_2").css("color", "#c19511");
					$("#team_1").css("color", "#5788a8");
					$(".st_left .adr_bar").css("background", "linear-gradient(to left, #3498db, #5788a8)");
					$(".st_right .adr_bar").css("background", "linear-gradient(to left, #c19511, #f7bf16)");
					$("#team_1 #team_name").html(tname.ct);
					$("#team_1 #team_score").html(team_ct.score);
					$("#team_2 #team_name").html(tname.t);
					$("#team_2 #team_score").html(team_t.score);
				} else {
					$(".round_team_2_name").html(tname.ct);
					$(".round_team_1_name").html(tname.t);
					$(".round_team_2_name").css("color", "#5788a8");
					$(".round_team_1_name").css("color", "#c19511");
					$("#team_1").css("color", "#c19511");
					$("#team_2").css("color", "#5788a8");
					$(".st_right .adr_bar").css("background", "linear-gradient(to left, #3498db, #5788a8)");
					$(".st_left .adr_bar").css("background", "linear-gradient(to left, #c19511, #f7bf16)");
					$("#team_2 #team_name").html(tname.ct);
					$("#team_2 #team_score").html(team_ct.score);
					$("#team_1 #team_name").html(tname.t);
					$("#team_1 #team_score").html(team_t.score);
				}
				team_money.sec += stats.money;
				eq_money.sec += stats.equip_value;
				added.sec += 1;
				if(added.sec >= 5){
					$("#team_money_2").html("$" + team_money.sec);
					$("#eq_money_2").html("$" + eq_money.sec);
				}
			}
			//NAMES:
			$("#team-" + side + " #player" + obs_sl + " .bar1 .hp_bar #bar_username").html(player.name.split(" ").join(""));

			//HP Bars
			if(obs_sl >= 1 && obs_sl <=5){
				var grad = "linear-gradient(to right, " + health_color + " " + stats.health + "%, rgba(0,0,0,0) " + stats.health + "%)";
			} else {
				var grad = "linear-gradient(to right, rgba(0,0,0,0) " + (100-parseInt(stats.health)) + "%, " + health_color + " " + (100-parseInt(stats.health)) + "%)";
			}
			$("#team-" + side + " #player" + obs_sl + " .bar1 .hp_bar #bar_username").css("color", (stats.health > 0) ? "white" : "rgba(255, 255, 255, 0.3)");
			$("#team-" + side + " #player" + obs_sl + " .bar1 .hp_bar #hp_p").html(stats.health);
			$("#team-" + side + " #player" + obs_sl + " .bar1 .hp_bar").css("background", grad);

			//STATS
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .stat_t .kills").html(stats.kills);
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .stat_t .assists").html(stats.assists);
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .stat_t .deaths").html(stats.deaths);
			if(stats.round_kills > 0){
				$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar #weapon_icon").prepend("<img src=\"death.png\"  style=\"float:" + ((side == "ct") ? "left" : "right") + "; height:60%; margin-top:5px;\"/><div style=\"text-shadow: 0 0 10px black; float:" + ((side == "ct") ? "left" : "right") + ";\">" + stats.round_kills + "</div>");
			}

			//ITEMS
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar .hp_el").html((stats.helmet == true) ? "<img src=\"helmet.png\" />" : ((stats.armor >0) ? "<img src=\"armor.png\" />" : ""));
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar .bomb_defuse").html((stats.defusekit) ? "<img src=\"defuse.png\" class=\"invert_brightness\"/>" : "");
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar .moneys").html("$" + stats.money);

			$("#team-" + side + " #player" + obs_sl + " .bar1 .hp_bar #weapon_icon").html("");
			$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar #weapon_icon").html("");
			for(var key in weapons){
				var weapon = weapons[key];
				if (weapon.type == "Grenade") {
					var addclass= "";
					if(weapon.state == "active"){
						addclass = "checked";
					}
					for(var x = 0; x < weapon.ammo_reserve; x++){
						$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar #weapon_icon").append("<img src='" + weapon.name + ".png' class=\"invert " + addclass + "\" />");
					}

				} else if(weapon.type == "Pistol"){
					var addclass= "";
					var name = weapon.name.replace("weapon_", "");
					if(weapon.state == "active"){
						addclass = "checked";
					}
					if(side == "t"){
						addclass += " img-hor";
					}
						$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar #weapon_icon").prepend("<img src='" + icons[name] + "' class=\"invert " + addclass + "\" />");

				} else if(weapon.type == "C4"){
					$("#team-" + side + " #player" + obs_sl + " .bottom_bar .equip_bar .bomb_defuse").html("<img src=\"bomb.png\" class=\"invert_brightness\"/>");

				} else if(weapon.type != "Knife"){
					var addclass= "";
					var name = weapon.name.replace("weapon_", "");
					if(weapon.state == "active"){
						addclass = "checked";

					}
					if(side == "t"){
							addclass = addclass + " img-hor";
					}
						$("#team-" + side + " #player" + obs_sl + " .bar1 .hp_bar #weapon_icon").prepend("<img src='" + icons[name] + "' class=\"invert " + addclass + "\" style=\"max-width:100%; max-height:100%;\"/>");
				}
			}


			//ADR
			//OK I admit this is some random bullshit, no idea how to get damage done in given round
			var adr = 0;
			if(map.round != adr_r){
				if(map.round != 0 && adr_g < 10){

					adr = Math.floor(((stats.kills*100 + stats.assists*58)/(map.round))*(Math.floor((Math.random() * 30) + 85)/100));
					adr_p["a_" + obs_sl] = adr;
					$("#stats_player" + obs_sl + " .adr_stat .adr").html(adr + " ADR");
					start_money[steamid] = stats.money;
					if(bestadr < adr){
						bestadr = adr;
					}

					$("#stats_player1 .adr_stat .adr_bar").css("width", (adr_p.a_1/bestadr)*75 + "%");
					$("#stats_player2 .adr_stat .adr_bar").css("width", (adr_p.a_2/bestadr)*75 + "%");
					$("#stats_player3 .adr_stat .adr_bar").css("width", (adr_p.a_3/bestadr)*75 + "%");
					$("#stats_player4 .adr_stat .adr_bar").css("width", (adr_p.a_4/bestadr)*75 + "%");
					$("#stats_player5 .adr_stat .adr_bar").css("width", (adr_p.a_5/bestadr)*75 + "%");
					$("#stats_player6 .adr_stat .adr_bar").css("width", (adr_p.a_6/bestadr)*75 + "%");
					$("#stats_player7 .adr_stat .adr_bar").css("width", (adr_p.a_7/bestadr)*75 + "%");
					$("#stats_player8 .adr_stat .adr_bar").css("width", (adr_p.a_8/bestadr)*75 + "%");
					$("#stats_player9 .adr_stat .adr_bar").css("width", (adr_p.a_9/bestadr)*75 + "%");
					$("#stats_player0 .adr_stat .adr_bar").css("width", (adr_p.a_0/bestadr)*75 + "%");
					adr_g++;
				} else {
					adr_r = map.round;
					bestadr = adr_g = 0;
				}
			}
			if(start_money[steamid] === undefined){
				start_money[steamid] = stats.money;
			}
			$("#stats_player" + obs_sl + " #stat_money").html("-" + (start_money[steamid] - stats.money) + "$")

		}
	}

	//PHASES
	if(map.phase == "live"){
		givedrops = true;
	}
	if(data.info.phase_countdowns){
		if(data.info.phase_countdowns.phase == "live" || data.info.phase_countdowns.phase == "over" || data.info.phase_countdowns.phase == "warmup"){
			$("#time_counter").css("color", "white");
		} else if(data.info.phase_countdowns.phase == "bomb" || data.info.phase_countdowns.phase == "paused"){
			$("#time_counter").css("color", "red");
		} else if(data.info.phase_countdowns.phase == "freezetime"){
			if(data.info.phase_countdowns.phase_ends_in > 10){
				$("#time_counter").css("color", "white");
			} else {
				$("#time_counter").css("color", "red");
			}
		}

		if(data.info.phase_countdowns.phase == "freezetime" || data.info.map.phase == "intermission"){
			if(data.info.phase_countdowns.phase_ends_in > 3){
				if($(".money").css("opacity") == 0){
					$(".money").fadeTo(1000, 1);
					$(".stat_t").fadeTo(1000, 1);
					$("#stats-container").fadeTo(1000, 1);
					$("#player-container").fadeTo(1000, 0);
				}
			} else {
				if($(".money").css("opacity") == 1){
					$(".money").fadeTo(1000, 0);
					$(".stat_t").fadeTo(1000, 0);
					$("#stats-container").fadeTo(1000, 0);
					$("#player-container").fadeTo(1000, 1);
				}
			}

		} else {
			if($(".money").css("opacity") == 1){
				$(".money").fadeTo(1000, 0);
				$(".stat_t").fadeTo(1000, 0);
				$("#stats-container").fadeTo(1000, 0);
				$("#player-container").fadeTo(1000, 1);
			}
		}
		if(data.info.phase_countdowns.phase_ends_in){
			var countdown = Math.ceil(data.info.phase_countdowns.phase_ends_in);
			var count_minute = Math.floor(countdown/60);
			var count_seconds = countdown - (count_minute*60);
			if(count_seconds < 10){
				count_seconds = "0" + count_seconds;
			}
			$("#time_counter").html(count_minute + ":" + count_seconds);
		}
	}

	//WIN ICONS
	if(data.info.round.phase == "over" && last_added[data.info.map.round] !== true){
		var classes = "";
		var img = "";
		var test_player = data.getPlayer(0);


		if(test_player.team == data.info.round.win_team){
			if(test_player.observer_slot >=1 && test_player.observer_slot <= 5){
				classes = data.info.round.win_team.toLowerCase() + "-win fst";
			} else {
				classes = data.info.round.win_team.toLowerCase() + "-win snd";
			}
		} else {
			if(test_player.observer_slot >=1 && test_player.observer_slot <= 5){
				classes =  data.info.round.win_team.toLowerCase() + "-win snd";
			} else {
				classes = data.info.round.win_team.toLowerCase() + "-win fst";
			}
		}

		if(data.info.round.bomb){
			if(data.info.round.bomb == "defused"){
				img = "<img src=\"defuse.png\" class=\"defuse\" />";
			} else if(data.info.round.bomb == "exploded"){
				img = "<img src=\"bomb.png\" class=\"bomb\" />";
			}
		} else {
			img = "<img src=\"skull_" + data.info.round.win_team.toLowerCase() + ".png\" class=\"skull\" />";
		}
		if(data.info.map.round < 16){
			$("#stats_1st").prepend("<div class=\"" + classes + "\">" + img + "</div>");
		} else {
			$("#stats_2nd .first_t").before("<div class=\"" + classes + "\">" + img + "</div>")
		}
		last_added[data.info.map.round] = true;
	}

	if(data.info.round.phase == "freezetime" && data.info.map.round == 0){
		last_added = [];
		//$("#stats_1st").html('<div style="height:85px; width:50%; position: absolute; right:0; border-left:1px dotted white;"></div><div style="height:85px; width:50%; position: absolute; left:0; border-right:1px dotted white;"></div><div class="first_t"><div class="round_team_1_name">TEAM 1</div></div><div class="sec_t"><div class="round_team_2_name">TEAM 1</div></div>');
		$(".fst").remove();
		$(".snd").remove();
	}

}

server.listen(1337);

var json;

var tickinterval;

var bombtime = 0;

var flashing = false;
