const questionnaires = getQuestionnaire();
console.log(questionnaires);

const dispayQuestionnaire = document.querySelector('.dispayQuestionnaire');
let isOpen = false;

dispayQuestionnaire.innerHTML = "";
questionnaires.forEach(questionnaire => {


    const qDiv = document.createElement('div');
    qDiv.innerHTML = `
    <h2>${questionnaire.questionnaire}</h2>
    `

    const openBtn = document.createElement('button');
    openBtn.textContent = "Open questionnaire";
    openBtn.addEventListener('click', () => {
        if (!isOpen) {

            //OPEN
            isOpen = true;

            //clear the current display
            dispayQuestionnaire.innerHTML = "";

            //Questionnaire title and description
            const title = document.createElement('h2');
            title.textContent = questionnaire.questionnaire;
            const description = document.createElement('p');
            description.textContent = questionnaire.description;

            dispayQuestionnaire.appendChild(title);
            dispayQuestionnaire.appendChild(description);

            //display every question
            questionnaire.questions.forEach((quest, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `
            <p>${index + 1}. ${quest.question}</p>
             `
                dispayQuestionnaire.appendChild(questionDiv);
            });

            //change the button to close
            openBtn.textContent = "Close Questionnaire";
            dispayQuestionnaire.appendChild(openBtn);


        } else {
            isOpen = false;

            //change what the button does
            //clear questionnaire
            dispayQuestionnaire.innerHTML = "";

            //show questionnaire card again
            dispayQuestionnaire.appendChild(qDiv);
            dispayQuestionnaire.appendChild(openBtn);

            //change button back to open
            openBtn.textContent = "Open Questionnaire";

        }

    });

    dispayQuestionnaire.appendChild(qDiv);
    dispayQuestionnaire.appendChild(openBtn);

});