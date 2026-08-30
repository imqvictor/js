const questionnaires = getQuestionnaire();
console.log(questionnaires);

const dispayQuestionnaire = document.querySelector('.dispayQuestionnaire');


function displayQuestionnaires() {

    dispayQuestionnaire.innerHTML = "";
    questionnaires.forEach(questionnaire => {
        //set isOpen to false for each questinnaire
        let isOpen = false;

        //Questionnaire title and description
        const title = document.createElement('h2');
        title.textContent = questionnaire.questionnaire;
        const description = document.createElement('p');
        description.textContent = questionnaire.description;

        const questionContainer = document.createElement('div');

        //display every question
        questionnaire.questions.forEach((quest, index) => {

            //create a div to hold all the questions
            const questionDiv = document.createElement('div');
            if (quest.type === "multiple-choice") {

                questionDiv.innerHTML = `
                        <p>${index + 1}. ${quest.question}</p>
                        `
                quest.choices.forEach((choice, choiceIndex) => {
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.id = `question${quest.id}-choice-${choiceIndex}`;
                    radioInput.name = `question-${quest.id}`;
                    radioInput.value = choice;


                    const label = document.createElement('label');
                    label.htmlFor = `question${quest.id}-choice-${choiceIndex}`;
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
                textInput.id = `question-${quest.id}`;


                questionDiv.appendChild(textInput);

            }

            if (quest.type === "yes/no") {
                questionDiv.innerHTML = `
                   <p>${index + 1}. ${quest.question}</p>
                   `
                quest.choices.forEach((choice, choiceIndex) => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `question-${quest.id}`;
                    radio.id = `question${quest.id}-choice-${choiceIndex}`;
                    radio.value = choice;


                    const label = document.createElement('label');
                    label.htmlFor = `question${quest.id}-choice-${choiceIndex}`;
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
                numBer.id = `question-${quest.id}`;


                questionDiv.appendChild(numBer);
                questionDiv.appendChild(document.createElement('br'));
            }

            questionContainer.appendChild(questionDiv);


        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = "SUBMIT";
        questionContainer.appendChild(submitBtn);
        submitBtn.addEventListener('click', () => {

            const response = {
                id: questionnaire.id,
                questionnaire: questionnaire.questionnaire,
                description: questionnaire.description,
                answers: []
            }

            questionnaire.questions.forEach(quest => {

                let answerValue;

                if (quest.type === "multiple-choice") {

                    const selected = document.querySelector(
                        `input[name=question-${quest.id}]:checked`);
                    console.log(selected);

                    if (!selected) {

                        alert("please answer all questions");
                        return;
                    }

                    answerValue = selected.value;
                }

                if (quest.type === "yes/no") {

                    const selected = document.querySelector(
                        `input[name=question-${quest.id}]:checked`);
                    console.log(selected);

                    if (!selected) {

                        alert("please answer all questions");
                        return;
                    }

                    answerValue = selected.value;
                }


                if (quest.type === "number") {

                    const input = document.querySelector(
                        `question-${quest.id}`);
                    console.log(input);

                    if (input.value === "") {

                        alert("please answer all questions");
                        return;
                    }

                    answerValue = input.value;
                }

                if (quest.type === "short-text") {

                    const input = document.querySelector(
                        `question-${quest.id}`);
                    console.log(input);

                    if (input.value.trim() === "") {

                        alert("please answer all questions");
                        return;
                    }

                    answerValue = input.value;
                }

                const answer = {
                    id: quest.id,
                    question: quest.question,
                    description: questionnaire.description,
                    answer: answerValue
                };

                response.answers.push(answer);

                console.log(response);
            })

        })

        questionContainer.style.display = "none";

        const openBtn = document.createElement('button');
        openBtn.textContent = "Open questionnaire";
        openBtn.addEventListener('click', () => {
            if (!isOpen) {

                //OPEN
                isOpen = true;

                //show questions div which contains questions
                questionContainer.style.display = "block";

                openBtn.textContent = "Close Questionnaire";

            } else {
                //change what the button does

                //CLOSE
                isOpen = false;

                questionContainer.style.display = "none";

                openBtn.textContent = "Open Questionnaire";

            }


        });

        dispayQuestionnaire.appendChild(title);
        dispayQuestionnaire.appendChild(description);
        dispayQuestionnaire.appendChild(questionContainer);
        dispayQuestionnaire.appendChild(openBtn);

    });

}

displayQuestionnaires();