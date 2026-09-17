
const questionnaires = getQuestionnaire();
console.log(questionnaires);
const responses = getResponse();
const user = getCurrentUser();
console.log(user.username);
console.log(user.id);

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
        //create an error meassage
        let message = document.createElement('p');
        message.id = 'message';

        //create an input field for school name
        const schoolName = document.createElement('input');
        schoolName.placeholder = "Enter school name";

        const questionContainer = document.createElement('div');
        questionContainer.id = 'questionContainer';
        questionContainer.appendChild(schoolName);

        //display every question
        questionnaire.questions.forEach((quest, index) => {


            //create a div to hold all the questions
            const questionDiv = document.createElement('div');
            questionDiv.className = 'questionDiv';
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
                textInput.className = 'input';  //for css
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
                numBer.className = 'input'; //for css


                questionDiv.appendChild(numBer);
                questionDiv.appendChild(document.createElement('br'));
            }


            questionContainer.appendChild(questionDiv);

        });

        const submitBtn = document.createElement('button');
        submitBtn.id = 'submitBtn';
        submitBtn.textContent = "SUBMIT";
        questionContainer.appendChild(submitBtn);
        submitBtn.addEventListener('click', () => {

            message.innerHTML = "";

            let isValid = true;

            const schoolNameValue = schoolName.value.trim();

            if (schoolNameValue === "") {
                isValid = false;
                message.textContent = "Please enter the school name";
            }


            // 2. Validate every question
            for (const quest of questionnaire.questions) {

                if (quest.type === "multiple-choice" || quest.type === "yes/no") {

                    const selected = questionContainer.querySelector(
                        `input[name="question-${quest.id}"]:checked`
                    );

                    if (!selected) {
                        isValid = false;
                        message.textContent = "Please answer all the questions";
                        break;
                    }
                }

                if (quest.type === "number" || quest.type === "short-text") {

                    const input = questionContainer.querySelector(
                        `#question-${quest.id}`
                    );

                    if (input.value.trim() === "") {
                        isValid = false;
                        message.textContent = "Please answer all the questions";
                        break;
                    }
                }
            }


            //stop if something is misssing
            if (!isValid) {
                return;
            }

            //Check if the questionnaire has already been submitted
            const questionnaireAlreadyExist = responses.some(response =>
                response.id === questionnaire.id &&
                response.userID === user.id
            );

            //if true message
            if (questionnaireAlreadyExist) {
                message.textContent = "You have already submitted this questionnaire.";
                return;
            }

            //create response
            const response = {
                userID: user.id,
                id: questionnaire.id,
                questionnaire: questionnaire.questionnaire,
                description: questionnaire.description,
                answers: [],
                username: user.username,
                school: schoolNameValue
            }

            //collect answers
            for (const quest of questionnaire.questions) {

                let answerValue;

                if (quest.type === "multiple-choice" || quest.type === "yes/no") {

                    const selected = questionContainer.querySelector(
                        `input[name="question-${quest.id}"]:checked`
                    );

                    answerValue = selected.value;

                }

                if (quest.type === "number" || quest.type === "short-text") {

                    const input = questionContainer.querySelector(
                        `#question-${quest.id}`
                    );

                    answerValue = input.value;
                }

                const answer = {
                    id: quest.id,
                    question: quest.question,
                    description: questionnaire.description,
                    answer: answerValue
                };

                response.answers.push(answer);
            }


            //if not save
            responses.push(response);

            submitBtn.style.backgroundColor = "green";

            //SAVE ONLY AFTER ALL THE QUESTIONS HAVE BEEN PROCESSED
            localStorage.setItem('response', JSON.stringify(responses));
            console.log(response);
            console.log(responses);
        })

        questionContainer.style.display = "none";

        const openBtn = document.createElement('button');
        openBtn.id = 'openBtn';
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

        const cards = document.createElement('div');
        cards.className = 'cards';

        cards.appendChild(title);
        cards.appendChild(description);
        cards.appendChild(message);
        cards.appendChild(questionContainer);
        cards.appendChild(openBtn);

        dispayQuestionnaire.appendChild(cards);

    });

}

displayQuestionnaires();