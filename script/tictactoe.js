let emptyDiv = [0,1,2,3,4,5,6,7,8];
let playerInput = "X";
let compInput = "O";
let iterateAnimation = 0;
let animateWin = [];
let mode = "Easy AI";
let easyScore = [0,0,0];
let mediumScore = [0,0,0];
let playerScore = [0,0,0];

function clickEvent() {
	for (let i = 0; i < 9; i++) {
		let div = document.getElementsByClassName("divInput")[i];
		div.addEventListener("click", function() {
			if (titleTurn.innerHTML === playerInput) {
				occupyBtn(div, playerInput);
				removeFromArray(i);
				interactAllBtn(false);
				if (!(checkWin(playerInput))) {
					if (mode != "Player Two") {
						compTurn();
					} else {
						interactEmpty();
						titleTurn.innerHTML = compInput;
						titleTurn.style.backgroundColor = "#d93251";
					}
				}
			} else if (titleTurn.innerHTML === compInput) {
				occupyBtn(div, compInput);
				removeFromArray(i);
				if (!(checkWin(compInput))) {
					interactEmpty();
					titleTurn.innerHTML = playerInput;
					titleTurn.style.backgroundColor = "#6dbde9";
				}
			}
			
			
		});
	}
}
clickEvent();

let jumbotron = document.getElementById("jumbotronHead");
let titleTurn = document.getElementById("displayTitle");
let firstBtn = document.getElementById("firstBtn");
let closeBtn = document.getElementById("closeBtn");

let playerFirst = document.getElementById("playerFirst");
playerFirst.addEventListener("click", function(){
	firstBtn.disabled = true;
	dropdownInput.disabled = true;
	dropdownMode.disabled = true;
	resetGame();
	interactAllBtn(true);
	closeBtn.click();
	titleTurn.innerHTML = playerInput;
	titleTurn.style.backgroundColor = "#6dbde9";
});

let compFirst = document.getElementById("compFirst");
compFirst.addEventListener("click", function(){
	firstBtn.disabled = true;
	dropdownInput.disabled = true;
	dropdownMode.disabled = true;
	resetGame();
	if (mode != "Player Two") {
		compTurn();
	} else {
		interactEmpty();
		titleTurn.innerHTML = compInput;
		titleTurn.style.backgroundColor = "#d93251";
	}
	closeBtn.click();
});

let playerTitle = document.getElementById("playerTitle");
let compTitle = document.getElementById("compTitle");

let dropdownInput = document.getElementById("dropdownInput");
let dropdownMode = document.getElementById("dropdownMode");

let selectEasy = document.getElementById("selectEasy");
selectEasy.addEventListener("click", function(){
	mode = "Easy AI";
	compTitle.innerHTML = mode + " (" + compInput + ")";
	document.getElementById("playerScore").innerHTML = easyScore[0];
	document.getElementById("tieScore").innerHTML = easyScore[1];
	document.getElementById("compScore").innerHTML = easyScore[2];
});

let selectMedium = document.getElementById("selectMedium");
selectMedium.addEventListener("click", function(){
	mode = "Medium AI";
	compTitle.innerHTML = mode + " (" + compInput + ")";
	document.getElementById("playerScore").innerHTML = mediumScore[0];
	document.getElementById("tieScore").innerHTML = mediumScore[1];
	document.getElementById("compScore").innerHTML = mediumScore[2];
});

let selectP2 = document.getElementById("selectP2");
selectP2.addEventListener("click", function(){
	mode = "Player Two";
	compTitle.innerHTML = mode + " (" + compInput + ")";
	document.getElementById("playerScore").innerHTML = playerScore[0];
	document.getElementById("tieScore").innerHTML = playerScore[1];
	document.getElementById("compScore").innerHTML = playerScore[2];
});

let selectX = document.getElementById("selectX");
selectX.addEventListener("click", function(){
	swapInput("X");
});
let selectO = document.getElementById("selectO");
selectO.addEventListener("click", function(){
	swapInput("O");
});

function swapInput(input) {
	if (input == "X") {
		playerTitle.innerHTML = "Player (X)";
		compTitle.innerHTML = mode + " (O)";
		playerInput = "X";
		compInput = "O";
	} else {
		playerTitle.innerHTML = "Player (O)";
		compTitle.innerHTML = mode + " (X)";
		playerInput = "O";
		compInput = "X";
	}
	playerFirst.innerHTML = playerInput;
	compFirst.innerHTML = compInput;
}

function resetGame() {
	emptyDiv = [0,1,2,3,4,5,6,7,8];
	iterateAnimation = 0;
	for (let i = 0; i < 9; i++) {
		let div = document.getElementsByClassName("divInput")[i];
		div.innerHTML = "";
	}
}

function compTurn() {
	titleTurn.innerHTML = compInput;
	titleTurn.style.backgroundColor = "#d93251";
	setTimeout(function() {
		if (mode == "Easy AI") {
			compRandom();
		} else if (!(compAdvance(compInput))) {
			if (!(compAdvance(playerInput))) {
				compRandom();
			}
		}
		if (!(checkWin(compInput))) {
			interactEmpty();
			titleTurn.innerHTML = playerInput;
			titleTurn.style.backgroundColor = "#6dbde9";

		}
	}, 1000);
}

function compRandom() {
	let random = Math.floor(Math.random()* emptyDiv.length);
	let removeValue = emptyDiv.splice(random,1);
	removeValue = Number(removeValue);
	let div = document.getElementsByClassName("divInput")[removeValue];
	occupyBtn(div, compInput);
}

function occupyBtn(div, input) {
	div.innerHTML = input;
	div.style.pointerEvents = "none";
	if (input == playerInput) {
		div.style.color = "#6dbde9";
	} else {
		div.style.color = "#d93251";
	}	
}

function removeFromArray(i) {
	let index = emptyDiv.indexOf(i);
	emptyDiv.splice(index,1);
}

function checkWin(input) {
	let position = [];
	for (let i = 0; i < 9; i++) {
		position.push(document.getElementsByClassName("divInput")[i].innerHTML);
	}
	let [
	topLeft, topMid, topRight,
	midLeft, midMid, midRight,
	botLeft, botMid, botRight] = position;

	let winState = [
	(topLeft == input && topMid == input && topRight == input),
	(midLeft == input && midMid == input && midRight == input),
	(botLeft == input && botMid == input && botRight == input),
	(topLeft == input && midLeft == input && botLeft == input),
	(topMid == input && midMid == input && botMid == input),
	(topRight == input && midRight == input && botRight == input),
	(topLeft == input && midMid == input && botRight == input),
	(topRight == input && midMid == input && botLeft == input)];

	for (let i = 0; i < winState.length; i++) {
		if (winState[i]) {
			animateWin = [];
			if (i === 0) {
				animateWin.push(0);
				animateWin.push(1);
				animateWin.push(2);
			}
			else if (i === 1) {
				animateWin.push(3);
				animateWin.push(4);
				animateWin.push(5);
			}
			else if (i === 2) {
				animateWin.push(6);
				animateWin.push(7);
				animateWin.push(8);
			}
			else if (i === 3) {
				animateWin.push(0);
				animateWin.push(3);
				animateWin.push(6);
			}
			else if (i === 4) {
				animateWin.push(1);
				animateWin.push(4);
				animateWin.push(7);
			}
			else if (i === 5) {
				animateWin.push(2);
				animateWin.push(5);
				animateWin.push(8);
			}
			else if (i === 6) {
				animateWin.push(0);
				animateWin.push(4);
				animateWin.push(8);
			}
			else {
				animateWin.push(2);
				animateWin.push(4);
				animateWin.push(6);
			}
			alertWinner(input);
			return true;
		}
	}
	if (emptyDiv.length == 0) {
		firstBtn.disabled = false;
		dropdownInput.disabled = false;
		dropdownMode.disabled = false;
		titleTurn.innerHTML = "Draw";
		setTimeout(function() {
			titleTurn.innerHTML = "Tic Tac Toe";
		}, 2400);
		if (mode == "Easy AI") {
			easyScore[1] = easyScore[1] + 1;
			document.getElementById("tieScore").innerHTML = easyScore[1];
		}
		else if (mode == "Medium AI") {
			mediumScore[1] = mediumScore[1] + 1;
			document.getElementById("tieScore").innerHTML = mediumScore[1];
		}
		else if (mode == "Player Two") {
			playerScore[1] = playerScore[1] + 1;
			document.getElementById("tieScore").innerHTML = playerScore[1];
		}
		titleTurn.style.backgroundColor = "#bebebe";
		return true;
	}
	return false;
}

function alertWinner(input) {
	if (input == playerInput) {
		titleTurn.style.backgroundColor = "#6dbde9";
		if (mode == "Easy AI") {
			easyScore[0] = easyScore[0] + 1;
			document.getElementById("playerScore").innerHTML = easyScore[0];
		}
		else if (mode == "Medium AI") {
			mediumScore[0] = mediumScore[0] + 1;
			document.getElementById("playerScore").innerHTML = mediumScore[0];
		}
		else if (mode == "Player Two") {
			playerScore[0] = playerScore[0] + 1;
			document.getElementById("playerScore").innerHTML = playerScore[0];
		}
	} else {
		titleTurn.style.backgroundColor = "#d93251";
		if (mode == "Easy AI") {
			easyScore[2] = easyScore[2] + 1;
			document.getElementById("compScore").innerHTML = easyScore[2];
		}
		else if (mode == "Medium AI") {
			mediumScore[2] = mediumScore[2] + 1;
			document.getElementById("compScore").innerHTML = mediumScore[2];
		}
		else if (mode == "Player Two") {
			playerScore[2] = playerScore[2] + 1;
			document.getElementById("compScore").innerHTML = playerScore[2];
		}
	}
	titleTurn.innerHTML = input + " Wins!";
	setTimeout(function() {
		titleTurn.innerHTML = "Tic Tac Toe";
	}, 3000);
	winAnimation();
	firstBtn.disabled = false;
	dropdownInput.disabled = false;
	dropdownMode.disabled = false;
	interactAllBtn(false);
}

function interactEmpty() {
	for (let i = 0; i < emptyDiv.length; i++) {
		let div = document.getElementsByClassName("divInput")[emptyDiv[i]];
		div.style.pointerEvents = "auto";
	}
}

function interactAllBtn(bool) {
	for (let i = 0; i < 9; i++) {
		let div = document.getElementsByClassName("divInput")[i];
		if (bool) {
			div.style.pointerEvents = "auto";
		} else {
			div.style.pointerEvents = "none";
		}
  	}
}
interactAllBtn(false);

function winAnimation() {
	setTimeout(function() {
		blinkAnimation();
		iterateAnimation++;
		if (iterateAnimation < 3) {
			winAnimation();
		}
	}, 400)
}

function blinkAnimation() {
	for (let i = 0; i < 3; i++) {
		let div = document.getElementsByClassName("divInput")[animateWin[i]];
		div.style.opacity = "0";
		setTimeout(function() {
			div.style.opacity = "1";
		}, 200);
	}
}

function compAdvance(input) {
	let position = [];
	for (let i = 0; i < 9; i++) {
		position.push(document.getElementsByClassName("divInput")[i].innerHTML);
	}
	let [
	topLeft, topMid, topRight,
	midLeft, midMid, midRight,
	botLeft, botMid, botRight] = position;

	let winState = [
	(topLeft == "" && topMid == input && topRight == input), //0
	(topLeft == input && topMid == "" && topRight == input),
	(topLeft == input && topMid == input && topRight == ""),

	(midLeft == "" && midMid == input && midRight == input), //3
	(midLeft == input && midMid == "" && midRight == input),
	(midLeft == input && midMid == input && midRight == ""),

	(botLeft == "" && botMid == input && botRight == input), //6
	(botLeft == input && botMid == "" && botRight == input),
	(botLeft == input && botMid == input && botRight == ""),

	(topLeft == "" && midLeft == input && botLeft == input), //9
	(topLeft == input && midLeft == "" && botLeft == input),
	(topLeft == input && midLeft == input && botLeft == ""),

	(topMid == "" && midMid == input && botMid == input), //12
	(topMid == input && midMid == "" && botMid == input),
	(topMid == input && midMid == input && botMid == ""),

	(topRight == "" && midRight == input && botRight == input), //15
	(topRight == input && midRight == "" && botRight == input),
	(topRight == input && midRight == input && botRight == ""),

	(topLeft == "" && midMid == input && botRight == input), //18
	(topLeft == input && midMid == "" && botRight == input),
	(topLeft == input && midMid == input && botRight == ""),

	(topRight == "" && midMid == input && botLeft == input), //21
	(topRight == input && midMid == "" && botLeft == input),
	(topRight == input && midMid == input && botLeft == "")];

	for (let i = 0; i < winState.length; i++) {
		if (winState[i]) {
			if (i === 0 || i === 9 || i === 18) {
				occupyBtn(document.getElementsByClassName("divInput")[0], compInput);
				removeFromArray(0);
				return true;
			}
			else if (i === 1 || i === 12) {
				occupyBtn(document.getElementsByClassName("divInput")[1], compInput);
				removeFromArray(1);
				return true;
			}
			else if (i === 2 || i === 15 || i === 21) {
				occupyBtn(document.getElementsByClassName("divInput")[2], compInput);
				removeFromArray(2);
				return true;
			}
			else if (i === 3 || i === 10) {
				occupyBtn(document.getElementsByClassName("divInput")[3], compInput);
				removeFromArray(3);
				return true;
			}
			else if (i === 4 || i === 13 || i === 19|| i === 22) {
				occupyBtn(document.getElementsByClassName("divInput")[4], compInput);
				removeFromArray(4);
				return true;
			}
			else if (i === 5 || i === 16) {
				occupyBtn(document.getElementsByClassName("divInput")[5], compInput);
				removeFromArray(5);
				return true;
			}
			else if (i === 6 || i === 11 || i === 23) {
				occupyBtn(document.getElementsByClassName("divInput")[6], compInput);
				removeFromArray(6);
				return true;
			}
			else if (i === 7 || i === 14) {
				occupyBtn(document.getElementsByClassName("divInput")[7], compInput);
				removeFromArray(7);
				return true;
			}
			else if (i === 8 || i === 17 || i === 20) {
				occupyBtn(document.getElementsByClassName("divInput")[8], compInput);
				removeFromArray(8);
				return true;
			}
		}
	}
	return false;
}