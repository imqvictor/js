const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scisccor = document.getElementById('scisccor');
const message = document.querySelector('.message');
const result = document.getElementById('result');

const computer = document.querySelectorAll('.rps div');
const compArray = Array.from(computer);



function computersChoice() {
    const randomChoice = Math.floor(compArray.length * Math.random());

    const compChoice = compArray[randomChoice].dataset.choice;

    return compChoice;
}


function clicks() {

    const myRockChoice = compArray[0].dataset.choice;
    const myPaperChoice = compArray[1].dataset.choice;
    const myScisccorChoice = compArray[2].dataset.choice;

    rock.addEventListener('click', () => {
        const compChoice = computersChoice();
        console.log(compChoice);
        message.innerHTML = `you chose ${myRockChoice}  and computer chose ${compChoice}`;

        if (myRockChoice === "rock" && compChoice === "rock") {
            result.textContent = "Result: No winner";
        }
        else if (myRockChoice === "rock" && compChoice === "paper") {
            result.textContent = "Result: Computer Won";

        }
        else if (myPaperChoice === "rock" && compChoice === "scisccor") {
            result.textContent = "Result: You Won";
        }

    });

    paper.addEventListener('click', () => {
        const compChoice = computersChoice();
        console.log(compChoice);
        message.innerHTML = `you chose ${myPaperChoice}  and computer chose ${compChoice}`;

        if (myPaperChoice === "paper" && compChoice === "paper") {
            result.textContent = "Result: No winner";
        }
        else if (myPaperChoice === "paper" && compChoice === "scisccor") {
            result.textContent = "Result: Computer Won";
        }
        else if (myPaperChoice === "paper" && compChoice === "rock") {
            result.textContent = "Result: You Won";
        }

    });

    scisccor.addEventListener('click', () => {
        const compChoice = computersChoice();
        console.log(compChoice);
        message.innerHTML = `you chose ${myScisccorChoice}  and computer chose ${compChoice}`;

        if (myPaperChoice === "scisccor" && compChoice === "scisccor") {
            result.textContent = "Result: No Winner";
        } else if (myPaperChoice === "scisccor" && compChoice === "rock") {
            result.textContent = "Result:Computer Won ";
        } else if (myPaperChoice === "scisccor" && compChoice === "paper") {
            result.textContent = "Result: You Won";
        }

    });

}

clicks();