window.onload = genBoards;

var min = 1;
var max = 30;
var size = 4;
var nBoards = 3;

function genBoards() {
	// get div with boards
	let boards = document.getElementById("boards");

	// clear previous boards
	boards.innerHTML = "";

	// fill with boards
	for(let i = 0; i < nBoards; i++) {
		boards.appendChild(newBoard(i));
	}
}

function newBoard(nBoard) {
	// create div with board
	let board = document.createElement("DIV");
	board.setAttribute("class", "block")

	// add text box for student's name
	let name = document.createElement("INPUT");
	name.setAttribute("type", "text");
	name.style.width = (size*56+2) + "px";
	board.appendChild(name);

	// store used numbers
	let usedNums = new Array(max+1);

	// start a <table> node
	let tab = document.createElement("TABLE");

	// assemble rows of the table
	for(let i=0; i < size; i++) {
		let row = document.createElement("TR");

		// fill row with numbers
		for(let j=0; j < size; j++) {
			// generate a random number that has not been used yet
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			do {
				num = Math.floor(Math.random() * (max - min + 1)) + min;
			} while(usedNums[num]);

			usedNums[num] = true;

			// fill row with number
			let cell = document.createElement("TH");
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
	let cell = document.getElementById("cell" + nBoard.toString() + i.toString() + j.toString());
	if(cell.style.backgroundColor == "") {
		cell.style.backgroundColor = "DimGray";
	} else {
		cell.style.backgroundColor = "";
	}
}