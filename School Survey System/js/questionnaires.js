
const questionnaires = getQuestionnaire();
const displayQuestionnaire = document.querySelector('.displayQuestionnaire');
const form = document.getElementById('form');
const questionnaireTitleInput = document.getElementById('questionnaireTitle');
const descriptionInput = document.getElementById('description');
const questionInput = document.getElementById('question');
const typeInput = document.getElementById('type');
const createQuestionnaire = document.getElementById('createQuestionnaire');
const currentChoice = [];
const displayChoices = document.getElementById('displayChoices');


let currentQuestionnaireId = null;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addQuestion();
});


function addQuestion() {
    const questionnaireTitle = questionnaireTitleInput.value.trim();
    const description = descriptionInput.value.trim();
    const questionEntered = questionInput.value.trim();
    const type = typeInput.value.trim();



    const question = {
        id: Date.now(),
        question: questionEntered,
        type: type,
        choices: []
    }
    question.choices = [...currentChoice];


    //creating a new questionnaire
    if (currentQuestionnaireId === null) {
        const questionnaire = {
            id: Date.now(),
            questionnaire: questionnaireTitle,
            description: description,
            questions: [],
        }

        questionnaire.questions.push(question);
        questionnaires.push(questionnaire);


    } else {
        //Adding a question to an existing questionnaire
        const existingQuestionnaire = questionnaires.find(q => q.id === currentQuestionnaireId);

        if (existingQuestionnaire) {
            existingQuestionnaire.questions.push(question);

            //rest the questionnare Id
            currentQuestionnaireId = null;
        }
    }


    localStorage.setItem('questionnaire', JSON.stringify(questionnaires));

    displayQuestionnaires();

    questionnaireTitleInput.value = "";
    descriptionInput.value = "";
    questionInput.value = "";
    typeInput.value = "";
    currentChoice.length = 0;
    displayChoices.innerHTML = "";
}

function displayQuestionnaires() {
    displayQuestionnaire.innerHTML = "";

    questionnaires.forEach(questionnaired => {
        const questionnaireDiv = document.createElement('div');
        questionnaireDiv.innerHTML = ` 
        <p>Questionnaire Title:${questionnaired.questionnaire}</p>
        <p>Description:${questionnaired.description}</p>
        `
        questionnaired.questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `
            <p>${index + 1}. Question:${question.question}</p>
            <p>${question.choices}</p>
            `
            questionnaireDiv.appendChild(questionDiv);

        });

        const addQuestionBtn = document.createElement('button');
        addQuestionBtn.textContent = "Add Question";
        addQuestionBtn.id = 'addQuestionBtn';
        addQuestionBtn.addEventListener('click', () => {
            console.log(questionnaired.id);
            const questionnaireId = questionnaires.find(q => q.id === questionnaired.id);

            if (questionnaireId) {
                questionnaireTitleInput.value = questionnaireId.questionnaire;
                descriptionInput.value = questionnaireId.description;

                console.log(questionnaireId);


                currentQuestionnaireId = questionnaireId.id;
                createQuestionnaire.textContent = "Add Question";
            }
            console.log(questionnaireId);
            localStorage.setItem('questionnaire', JSON.stringify(questionnaires));
            console.log(questionnaired.questions.length);
        });

        questionnaireDiv.appendChild(addQuestionBtn);


        displayQuestionnaire.appendChild(questionnaireDiv);

    });


}
displayQuestionnaires();

const choices = document.querySelector('.choices');
typeInput.addEventListener('change', () => {
    if (typeInput.value === "multiple-choice") {
        choices.style.display = "block";
    } else {
        choices.style.display = "none";
    }

    if (typeInput.value === "yes/no") {
        yesNo = ["Yes", "No"];
        console.log(yesNo);
    }

    if (typeInput.value === "number") {

    }
    if (typeInput.value === "short-text") {

    }

});




const choicesInput = document.getElementById('choicesInput');
const addChoiceBtn = document.getElementById('addChoiceBtn');
addChoiceBtn.addEventListener('click', () => {
    const choice = choicesInput.value.trim();
    if (choice === "") {
        alert("please enter choice");
        return;
    }

    currentChoice.push(choice);

    console.log('choices button clicked');
    console.log(currentChoice.length);

    displayChoices.innerHTML = "";

    currentChoice.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.innerHTML = `
        <label>${choice}</label>
       `
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "remove";

        choiceDiv.appendChild(removeBtn);
        displayChoices.appendChild(choiceDiv);

        choicesInput.value = "";


    });

});

console.log(questionnaires);
