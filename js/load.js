var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves: []
		},
		created: function(){
			let arrayPartidesVladdy = [];
			if(localStorage.partides){
				arrayPartidesVladdy = JSON.parse(localStorage.partides);
				if(!Array.isArray(arrayPartidesVladdy)) arrayPartidesVladdy = [];
			}
			this.saves = arrayPartidesVladdy;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				loadpage("../html/phasergame.html");
			}
		}
	});
	return {}; 
}();

