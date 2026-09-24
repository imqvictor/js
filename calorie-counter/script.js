const calorieCounter = document.getElementById('calorie-counter');
const entryDropDown = document.getElementById('entry-dropdown');
const budgetNumberInput = document.getElementById('budget');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const outPut = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
    // Remove all +, - and whitespace characters from the string
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str) {
    // Check if the string contains scientific notation (e.g., 1e10, 2E5)
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry() {
    //get the target input container based on the selected value in the dropdown
    const targetInputContainer = document.querySelector(`#${entryDropDown.value} .input-container`);

    //find all text inputs inside this continer, count them and add 1 to get the next entry number 
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
    <lable for="${entryDropDown.value}-${entryNumber}-name">Entry ${entryNumber} Name</lable> 
    <input type="text" id="${entryDropDown.value}-${entryNumber}-name" placeholder="Name" />
    <lable for="${entryDropDown.value}-${entryNumber}-calories">Entry ${entryNumber} calorie</lable> 
    <input type="number" id="${entryDropDown.value}-${entryNumber}-calories" placeholder="Calories" />
    `
    //insertAdjacentHTML() method to insert the HTML string into the target input container
    //beforeend: Inserts the HTML string as the last child of the target input container
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}


function calculateCalories(e) {
    e.preventDefault();
    isError = false;

    //find every number input inside the breafast section
    const breakFastNumberInputs = document.querySelectorAll('#breakfast input[type="number"]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type="number"]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type="number"]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type="number"]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type="number"]');

    const breakFastCalories = getCaloriesFromInputs(breakFastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);


    if (isError) {
        return;
    }

    const consumedCalories = breakFastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    outPut.innerHTML = `
    <span class="${surplusOrDeficit.toLocaleLowerCase()}">${Math.abs(remainingCalories)} 
    Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `
    outPut.classList.remove('hide');
}

function getCaloriesFromInputs(list) {
    let calories = 0;

    for (const item of list) {
        const currVall = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVall);

        if (invalidInputMatch) {
            alert("Invalid Input: ${invalidInputMatch[0]}");
            isError = true;
            return null;
        }
        calories += Number(currVall);
    }
    return calories;
}

function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));

    for (const container of inputContainers) {
        container.innerHTML = '';
    }

    budgetNumberInput.value = '';
    outPut.innerText = '';
    outPut.classList.add('hide');
}


addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);