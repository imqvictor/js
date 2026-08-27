const questionnaires = getQuestionnaire();
console.log(questionnaires);

const dispayQuestionnaire = document.querySelector('.dispayQuestionnaire');


function displayQuestionnaires() {

    dispayQuestionnaire.innerHTML = "";
    questionnaires.forEach(questionnaire => {
        //set isOpen to false for each questinnaire
        let isOpen = false;

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

                    if (quest.type === "multiple-choice") {

                        questionDiv.innerHTML = `
                        <p>${index + 1}. ${quest.question}</p>
                        `
                        quest.choices.forEach(choice => {
                            console.log(choice);
                            const radioInput = document.createElement('input');
                            radioInput.type = 'radio';
                            radioInput.id = `choice-${quest.id}`;
                            radioInput.name = `question-${quest.id}`;
                            radioInput.value = choice;

                            const label = document.createElement('label');
                            label.htmlFor = `choice-${quest.id}`;
                            label.textContent = choice;

                            questionDiv.appendChild(radioInput);
                            questionDiv.appendChild(label);
                            questionDiv.appendChild(document.createElement('br'));
                        });
                    }

                    if (quest.type === "short-text") {
                        questionDiv.innerHTML = `
                   <p>${index + 1}. ${quest.question}</p>
                   `
                        const textInput = document.createElement('input');
                        textInput.type = "text";
                        textInput.id = "text";

                        questionDiv.appendChild(textInput);

                    }

                    if (quest.type === "yes/no") {
                        questionDiv.innerHTML = `
                   <p>${index + 1}. ${quest.question}</p>
                   `
                        quest.choices.forEach(choice => {
                            const radio = document.createElement('input');
                            radio.type = 'radio';
                            radio.name = `question${quest.id}`;
                            radio.id = `choice-${quest.id}`;
                            radio.value = choice;

                            const label = document.createElement('label');
                            label.htmlFor = `choice-${quest.id}`;
                            label.textContent = choice;

                            questionDiv.appendChild(radio);
                            questionDiv.appendChild(label);
                            questionDiv.appendChild(document.createElement('br'));
                        })

                    }

                    if (quest.type === "number") {
                        questionDiv.innerHTML = `
                   <p>${index + 1}. ${quest.question}</p>
                   `
                        const numBer = document.createElement('input');
                        numBer.type = 'number';
                        numBer.id = "no";

                        quest.choices.push(numBer);

                        questionDiv.appendChild(numBer);
                        questionDiv.appendChild(document.createElement('br'));
                    }

                    dispayQuestionnaire.appendChild(questionDiv);
                });

                //change the button to close
                openBtn.textContent = "Close Questionnaire";
                dispayQuestionnaire.appendChild(openBtn);


            } else {
                //change what the button does

                //CLOSE
                isOpen = false;

                //clear display card
                dispayQuestionnaire.innerHTML = "";

                //change button back to open
                openBtn.textContent = "Open Questionnaire";

                //display the questionnaires
                displayQuestionnaires();
            }


        });

        dispayQuestionnaire.appendChild(qDiv);
        dispayQuestionnaire.appendChild(openBtn);

    });

}

displayQuestionnaires();