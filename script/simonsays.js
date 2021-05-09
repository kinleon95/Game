let targetInput = [];
let playerInput = [];
let iterateTarget = 0;
let speed = "Normal";
let mode = "Mouse";
let normalScore = [0,0];
let fastScore = [0,0];

function clickEvent() {
	for (let i = 0; i < 4; i++) {
		let div = document.getElementsByClassName("divInput")[i+4];
		div.addEventListener("click", function() {
			if (mode == "Mouse") {
				playerInput.push(i);
				colorWhenClick(div, i);
				playSound(i);
        		checkInput();
			}
		});
	}
}
clickEvent();

function keydownEvent(index, key) {
	document.addEventListener("keydown", function(event) {
		if (event.keyCode == key) {
			let div = document.getElementsByClassName("divInput")[index + 4];
			if (mode != "Mouse" && div.style.pointerEvents == "auto") {
				playerInput.push(index);
				colorWhenClick(div, index);
				playSound(index);
	        	checkInput();
			}
		}
	});
}
keydownEvent(0, 87);
keydownEvent(1, 65);
keydownEvent(2, 68);
keydownEvent(3, 83);

let jumbotron = document.getElementById("jumbotronHead");
let titleRound = document.getElementById("displayTitle");
let labelSpeed = document.getElementById("labelSpeed");

let dropdownSpeed = document.getElementById("dropdownSpeed");

let selectNormal = document.getElementById("selectNormal");
selectNormal.addEventListener("click", function(){
	speed = "Normal";
	labelSpeed.innerHTML = "Normal";
	document.getElementById("lastScore").innerHTML = normalScore[0];
	document.getElementById("bestScore").innerHTML = normalScore[1];
});

let selectFast = document.getElementById("selectFast");
selectFast.addEventListener("click", function(){
	speed = "Fast";
	labelSpeed.innerHTML = "Fast";
	document.getElementById("lastScore").innerHTML = fastScore[0];
	document.getElementById("bestScore").innerHTML = fastScore[1];
});

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function(){
	startBtn.disabled = true;
	startBtn.blur();
	dropdownSpeed.disabled = true;
	iterateTarget = 0;
	resetGame();
	randomInput();
	displayRound()
	displayInSequence();
});

let selectMouse = document.getElementById("selectMouse");
selectMouse.addEventListener("click", function(){
	mode = "Mouse";
	document.getElementsByClassName("divInput")[4].innerHTML = "";
	document.getElementsByClassName("divInput")[5].innerHTML = "";
	document.getElementsByClassName("divInput")[6].innerHTML = "";
	document.getElementsByClassName("divInput")[7].innerHTML = "";
});

let selectWASD = document.getElementById("selectWASD");
selectWASD.addEventListener("click", function(){
	mode = "WASD";
	document.getElementsByClassName("divInput")[4].innerHTML = "W";
	document.getElementsByClassName("divInput")[5].innerHTML = "A";
	document.getElementsByClassName("divInput")[6].innerHTML = "D";
	document.getElementsByClassName("divInput")[7].innerHTML = "S";
});

function resetGame() {
	targetInput.length = 0;
	playerInput.length = 0;
	titleRound.style.backgroundColor = "#6c757e";
	titleRound.style.transition = "background-color 0.2s";
}

function randomInput() {
	let random = Math.floor(Math.random()* 4);
	targetInput.push(random);
}

function colorWhenClick(div, i) {
	let clickColor = "";
	if (i == 0) {
		div.style.backgroundColor = "#dc3546";
	}
	else if (i == 1) {
		div.style.backgroundColor = "#27a844";
	}
	else if (i == 2) {
		div.style.backgroundColor = "#007aff";
	} else {
		div.style.backgroundColor = "#fec107";
	}
	setTimeout(function() {
		div.style.backgroundColor = "#6c757e";
		div.style.transition = "background-color 0.2s";
	}, 300);
}

function displayRound() {
	titleRound.innerHTML = "Round " + targetInput.length;
}

function checkInput() {
	for (let i = 0; i < targetInput.length; i++) {
		if (playerInput[i] == undefined) {
			return;
		}
		if (targetInput[i] != playerInput[i]) {
			titleRound.style.backgroundColor = "#d93251";
			titleRound.innerHTML = "Game Over";
			setTimeout(function() {
				titleRound.style.backgroundColor = "#6c757e";
				titleRound.innerHTML = "Simon Says";
			}, 2400);
			if (speed == "Normal") {
				normalScore[0] = targetInput.length - 1;
				document.getElementById("lastScore").innerHTML = normalScore[0];
				if (normalScore[0] > normalScore[1]) {
					normalScore[1] = normalScore[0];
					document.getElementById("bestScore").innerHTML = normalScore[1];
				}
			}
			else if (speed == "Fast") {
				fastScore[0] = targetInput.length - 1;
				document.getElementById("lastScore").innerHTML = fastScore[0];
				if (fastScore[0] > fastScore[1]) {
					fastScore[1] = fastScore[0];
					document.getElementById("bestScore").innerHTML = fastScore[1];
				}
			}
			interactAllBtn(false);
			startBtn.disabled = false;
			dropdownSpeed.disabled = false;
			break;
		}
		if (i == (targetInput.length - 1)) {
			titleRound.style.backgroundColor = "#036c8c";
			setTimeout(function() {
				titleRound.style.backgroundColor = "#6c757e";
				titleRound.style.transition = "background-color 0.2s";
			}, 600);
			playerInput = [];
			iterateTarget = 0;
			interactAllBtn(false);
			randomInput();
			displayRound()
			displayInSequence();
			break;
		}
	}
}

function interactAllBtn(bool) {
	for (let i = 0; i < 4; i++) {
		let div = document.getElementsByClassName("divInput")[i+4];
    	if (bool) {
			div.style.pointerEvents = "auto";
		} else {
			div.style.pointerEvents = "none";
		}
  	}
}
interactAllBtn(false);

function displayInSequence() {
	let time = 0;
	if (speed == "Normal") {
		time = 600;
	}
	else if (speed == "Fast") {
		time = 300;
	}
	setTimeout(function() {
		displayColor(time);
    	iterateTarget++;
    	if (iterateTarget < targetInput.length) {
      		displayInSequence();
    	} else {
    		setTimeout(function() {
    			interactAllBtn(true);
    		}, time)
    	}
	}, time)
}

function displayColor(time) {
	let div = document.getElementsByClassName("divInput")[targetInput[iterateTarget]];
	if (targetInput[iterateTarget] === 0) {
  		div.style.backgroundColor = "#dc3546";
	}
	else if (targetInput[iterateTarget] === 1) {
  		div.style.backgroundColor = "#27a844";
	}
	else if (targetInput[iterateTarget] === 2) {
  		div.style.backgroundColor = "#007aff";
	}
	else {
  		div.style.backgroundColor = "#fec107";
	}
	playSound(targetInput[iterateTarget]);
	setTimeout(function() {
  		div.style.backgroundColor = "#6c757e";
  		div.style.transition = "background-color 0.2s";
	}, (time / 2));
}

let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
let audio3 = document.getElementById("audio3");
let audio4 = document.getElementById("audio4");

function playSound(input) {
	let currentAudio = "";
	if (input === 0) {
		currentAudio = audio4.cloneNode();
		currentAudio.play();
	}
	else if (input === 1) {
		currentAudio = audio3.cloneNode();
		currentAudio.play();
	}
	else if (input === 2) {
		currentAudio = audio2.cloneNode();
		currentAudio.play();
	}
	else {
		currentAudio = audio1.cloneNode();
		currentAudio.play();
	}
}