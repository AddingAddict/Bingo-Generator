window.onload = newBoard;

var min = 1;
var max = 20;
var size = 4;

function newBoard() {
	// get div with boards
	var boards = document.getElementById("boards");

	// clear previous boards
	boards.innerHTML = "";

	// store used numbers
	var usedNums = new Array(max+1);

	// start a <table> node
	var tab = document.createElement("TABLE");

	// assemble rows of the table
	for(let i=0; i < size; i++) {
		var row = document.createElement("TR");

		// fill row with numbers
		for(let j=0; j < size; j++) {
			// generate a random number that has not been used yet
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			do {
				num = Math.floor(Math.random() * (max - min + 1)) + min;
			} while(usedNums[num]);

			usedNums[num] = true;

			// fill row with number
			var cell = document.createElement("TH");
			cell.appendChild(document.createTextNode(num.toString()));
			row.appendChild(cell);
		}

		// fill table with row
		tab.appendChild(row);
	}

	// add table to div with boards
	boards.appendChild(tab)
}