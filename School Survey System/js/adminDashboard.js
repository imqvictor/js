
const users = getUsers();
const CurrentAdmin = getCurrentAdmin();
console.log(getCurrentAdmin());
const welcome = document.getElementById('welcome');
welcome.textContent = `Welcome ${CurrentAdmin.username}`;

const questionnaires = getQuestionnaire();
console.log(questionnaires);

console.log(users);

const responses = getResponse();
console.log(responses);

const statistics = document.querySelector('.statistics');

function displayStatistics() {
    statistics.innerHTML = "";


    //create a school array from responses
    const schools = [];

    responses.forEach(obj => {

        //check if the school exists if not add it
        const existingSchool = schools.find(sch => sch === obj.school);
        if (!existingSchool) {
            schools.push(obj.school);
        }

    });


    const statisticsData = {
        questionnaires: `${questionnaires.length}`,
        enumerators: `${users.length}`,
        responses: `${responses.length}`,
        schools: `${schools.length}`
    };


    const cards = document.createElement('div');
    cards.id = "infoCards";

    cards.innerHTML = `
        <div>
        <p>Questionnaires</p>
        <p>${statisticsData.questionnaires}</p>
        </div>

        <div>
       <p>Enumerators</p> 
       <p>${statisticsData.enumerators}</p>
        </div>

        <div>
        <p>Responses</p>
        <p> ${statisticsData.responses}</p>
        </div>

        <div>
       <p>Schools Surveyed</p>  
       <p>${statisticsData.schools}</p>
       </div>
        
        `
    statistics.appendChild(cards);

}
displayStatistics();