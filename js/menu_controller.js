function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_game(){
	var name = prompt("Entra un nom");
	while (name=="" || !name){
        name = prompt("User name");
    }
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergame.html");
}

function phaser_game_augment(){
	loadpage("./html/phasergameaugment.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}


function load(){
	loadpage("./html/load.html");
}

