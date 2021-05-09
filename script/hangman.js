const words = [
["BELGIUM","MONGOLIA","ZIMBABWE"],
["DRAGONFRUIT", "DURIAN", "LEMON"],
["BADMINTON" ,"CYCLING", "RUGBY"]];

const category = ["Country","Fruit","Sport"]

let solved = 0;

let catRandom = Math.floor(Math.random()* category.length);
let random = Math.floor(Math.random()* words[catRandom].length);

let display = document.getElementById("display");
//let length = words[random].length;

let defaultTries = 8;
let blankLine = words[catRandom][random].length;

let titleHangman = document.getElementById("displayTitle");
let titleCategory = document.getElementById("category");

let paraLives = document.getElementById("paraLives");
let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function(){
	action.innerHTML = "";
	createButton();
	startBtn.disabled = true;
	defaultTries = 8
	displayLives();
	paraLives.style.color = "#04e404";
	display.innerHTML = "";
	selectRandom();
	blankLine = words[catRandom][random].length;
	createBlank();
	displayCategory();
	interactAllBtn(true);
	for (let i = 0; i < alphabets.length; i++) {
		let btn = document.getElementsByClassName("btn")[i+1];
		btn.setAttribute("class","btn");
	}
});

function displayLives() {
	paraLives.innerHTML = "";
	for (let i = 0; i < defaultTries; i++) {
		let lives = document.createElement("i");
		lives.setAttribute("class","fas fa-heart mr-2");
		paraLives.append(lives);
	}
}

function createBlank() {
	for (let i = 0; i < words[catRandom][random].length; i++) {
		let letter = document.createElement("span");
		letter.setAttribute("id","letter"+i);
		letter.setAttribute("class", "blankSpan");
		letter.innerHTML += "_";
		letter.style.margin = "10px"
		display.append(letter);
	}
}

function removeBlank() {
	for (let i = 0; i < words[catRandom][random].length; i++) {
		let letter = document.getElementsByClassName("blankSpan")[i];
		console.log(i);
		display.remove(letter);
	}
}

function selectRandom() {
	catRandom = Math.floor(Math.random()* category.length);
	random = Math.floor(Math.random()* words[catRandom].length);
}

function displayCategory() {
	titleCategory.innerHTML = category[catRandom];
}

const alphabets = [
"A","B","C","D","E","F","G",
"H","I","J","K","L","M","N",
"O","P","Q","R","S","T","U",
"V","W","X","Y","Z"];

function createButton() {
	for (let i = 0; i < alphabets.length; i++) {
		let btn = document.createElement("button");
		btn.setAttribute("id","btn"+alphabets[i]);
		btn.setAttribute("class","btn");
		btn.style.margin = "5px";
		btn.style.height = "60px";
		btn.style.width = "50px";;
		btn.style.border = "2px solid black";
		btn.style.background = "none";
		btn.style.fontFamily = "Century Gothic";
		btn.style.fontSize = "32px";
		btn.innerHTML = alphabets[i];

		btn.addEventListener("click",function(){
			btn.disabled = true;
			findLetter(i);
			colorBtn(btn, i);
			checkWin();
		});

		action.append(btn);
	}
}
createButton();

function findLetter(i) {
	for (let j = 0; j < words[catRandom][random].length; j++) {
		let letter = document.getElementById("letter"+j);
		if (words[catRandom][random].charAt(j) == alphabets[i]) {
			letter.innerHTML = alphabets[i];
			blankLine--;
		}
	}
}

function colorBtn(btn, i) {
	btn.setAttribute("class","btn text-white");
	btn.style.border = "none";
	btn.blur();
	if (words[catRandom][random].includes(alphabets[i])) {
		btn.style.backgroundColor = "#6dbde9";

	} else {
		btn.style.backgroundColor = "#d3d3d3";
		defaultTries--;
		displayLives();
		if (defaultTries < 6) {
			paraLives.style.color = "#fec107";
		}
		if (defaultTries < 3) {
			paraLives.style.color = "#dc3546";
		}
	}
}

function checkWin() {
	if (blankLine === 0) {
		startBtn.disabled = false;
		interactAllBtn(false);
		titleHangman.innerHTML = "Solved!"
		titleHangman.style.backgroundColor = "#ff4404";
		words[catRandom].splice(random, 1);
		solved++;
		if (words[catRandom].length == 0) {
			words.splice(catRandom, 1);
			category.splice(catRandom, 1);
		}
		if (category.length === 0) {
			display.innerHTML = "CONGRATS! ALL " + solved + " PUZZLE SOLVED";
			startBtn.disabled = true;
		}
		setTimeout(function() {
			titleHangman.style.backgroundColor = "#1d333f";
			titleHangman.innerHTML = "Hangman";
		}, 2400);
	}
	if (defaultTries === 0 && blankLine > 0) {
		startBtn.disabled = false;
		interactAllBtn(false);
		titleHangman.innerHTML = "Game Over"
		revealLetter();
		titleHangman.style.backgroundColor = "#d93251";
		setTimeout(function() {
			titleHangman.style.backgroundColor = "#1d333f";
			titleHangman.innerHTML = "Hangman";
		}, 2400);
	}
}

function revealLetter() {
	for (let i = 0; i < words[catRandom][random].length; i++) {
		let letter = document.getElementById("letter"+ i);
		letter.innerHTML = words[catRandom][random].charAt(i);
	}
}

function interactAllBtn(bool) {
	for (let i = 0; i < alphabets.length; i++) {
		let btn = document.getElementsByClassName("btn")[i+1];
		btn.disabled = !(bool);
	}
}
interactAllBtn(false);