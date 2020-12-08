window.onload = genBoards;

let min;
let max;
let size;
let nBoards;
let draws;
let drawInd;

function genBoards() {
	// read input
	min = parseInt(document.getElementById("min").value);
	max = parseInt(document.getElementById("max").value);
	size = parseInt(document.getElementById("size").value);
	nBoards = parseInt(document.getElementById("nBoards").value);
	draws = shuffleNums();
	drawInd = null;

	// check if there's enough numbers for bingo board
	if((max - min + 1) < size*size) {
		alert("Board size too large for given number range.\nIncrease the number range or decrease board size.")
	} else {
		// get div with boards
		let boards = document.getElementById("boards");

		// clear previous boards
		boards.innerHTML = "";

		// fill with boards
		for(let i = 0; i < nBoards; i++) {
			boards.appendChild(newBoard(i));
		}
	}
}

function draw() {
	if(drawInd == null) {
		drawInd = 0;
		document.getElementById("drawNum").innerHTML = draws[drawInd];
		document.getElementById("pNum").value = "";
		document.getElementById("mNum").value = "";
	} else if(drawInd < draws.length - 1) {
		drawInd += 1;
		document.getElementById("drawNum").innerHTML = draws[drawInd];
		document.getElementById("pNum").value = "";
		document.getElementById("mNum").value = "";
	} else {
		alert("Out of numbers.");
	}
}

function back() {
	if(drawInd == 0 || drawInd == null) {
		alert("Can't go back.")
	} else {
		drawInd -= 1;
		document.getElementById("drawNum").innerHTML = draws[drawInd];
		document.getElementById("pNum").value = "";
		document.getElementById("mNum").value = "";
	}
}

function newBoard(nBoard) {
	// create div with board
	let board = document.createElement("DIV");
	board.setAttribute("class", "block")

	// add text box for student's name
	let name = document.createElement("INPUT");
	name.className = "name";
	name.style.width = (size*56+2) + "px";
	name.setAttribute("type", "text");
	board.appendChild(name);

	// shuffle number range
	let nums = shuffleNums();

	// start a <table> node
	let tab = document.createElement("TABLE");

	// assemble rows of the table
	for(let i=0; i < size; i++) {
		let row = document.createElement("TR");

		// fill row with numbers
		for(let j=0; j < size; j++) {
			// pick a number from the shuffled list in order
			let num = nums[i*size + j]

			// fill row with number
			let cell = document.createElement("TH");
			cell.className = "cell";
			cell.setAttribute("id", "cell" + nBoard.toString() + i.toString() + j.toString())
			cell.addEventListener("click", function() { toggle(nBoard, i, j) } );
			cell.appendChild(document.createTextNode(num));
			row.appendChild(cell);
		}

		// fill table with row
		tab.appendChild(row);
	}

	// add table to div with boards
	board.appendChild(tab);

	return board;
}

function toggle(nBoard, i, j) {
	// find the cell that was clicked
	let cell = document.getElementById("cell" + nBoard.toString() + i.toString() + j.toString());

	// toggle cell color
	if(cell.style.backgroundColor == "") {
		cell.style.backgroundColor = "DimGray";
	} else {
		cell.style.backgroundColor = "";
	}
}

function shuffleNums() {
	// create array with all numbers in range
	let nums = [...Array(max + 1).keys()].slice(min);

	// shuffle array
	let currInd = nums.length;
	let randInd;
	let temp;

	while(currInd != 0) {
		// pick a random index to switch with the current index
		randInd = Math.floor(Math.random() * currInd);
		currInd -= 1;
		temp = nums[currInd];
		nums[currInd] = nums[randInd];
		nums[randInd] = temp;
	}

	return nums;
}