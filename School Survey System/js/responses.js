
const responses = getResponse();
console.log(responses);

const displayResponses = document.querySelector('.displayResponses');

function display() {
    displayResponses.innerHTML = "";

    responses.forEach(response => {
        const responseDiv = document.createElement('div');
        responseDiv.className = "responseDiv";
        responseDiv.innerHTML = `
        <h4>${response.description}</h4>
        `
        let isOpen = false;

        const userName = document.createElement('h5');
        userName.textContent = `Officer: ${response.username}`;
        const questioNnaire = document.createElement('h3');
        questioNnaire.textContent = `${response.questionnaire}`;
        const description = document.createElement('h4');
        description.textContent = `${response.description}`;
        const school = document.createElement('h4');
        school.textContent = `School: ${response.school}`;


        response.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = "answerDiv";
            answerDiv.innerHTML = `          
             <p>${index + 1}. ${answer.question}</p>          
             <p>findings: ${answer.answer}</p>          
            `

            responseDiv.appendChild(answerDiv);
        })

        responseDiv.style.display = "none";

        const openResponse = document.createElement('button');
        openResponse.id = "openResponse";
        openResponse.textContent = "OpenResponse";
        openResponse.addEventListener('click', () => {

            if (!isOpen) {

                //set is open to true
                isOpen = true;


                responseDiv.style.display = "block";
                openResponse.textContent = "CloseResponse";
            } else {
                //set is open to false again
                isOpen = false;

                responseDiv.style.display = "none";
                openResponse.textContent = "OpenResponse";
            }

        });

        //create a container to hold each response
        const responseContainer = document.createElement('div');
        responseContainer.className = "responseContainer";

        responseContainer.appendChild(questioNnaire);
        responseContainer.appendChild(school);
        responseContainer.appendChild(userName);
        responseContainer.appendChild(responseDiv);
        responseContainer.appendChild(openResponse);

        displayResponses.appendChild(responseContainer);
    });

}
display();