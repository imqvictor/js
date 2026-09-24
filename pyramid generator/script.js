const character = "#";
const count = 8;
const rows = [];
const inverted = true;

function padRow(rowNumber, rowCount) {

    return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) +

        " ".repeat(rowCount - rowNumber);
}

for (let i = 1; i <= count; i++) {

    if (inverted) {
        //this one inverts the pyramid, cause the first iteration will be the last element in the array
        rows.unshift(padRow(i, count));
    } else {
        //this here is the normal pyramid, since iterations will be arranged in the sequence they occur
        rows.push(padRow(i, count));
    }
}

let result = "";

for (const row of rows) {
    result += row + "\n";
}

console.log(result);