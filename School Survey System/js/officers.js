const user = getCurrentUser();
const welcome = document.getElementById('welcome');
welcome.textContent = `Welcome ${user.username}`;
console.log(user.id);

const questionnaires = getQuestionnaire();
console.log(questionnaires.length);

const responses = getResponse();
console.log(responses);

const statistics = document.querySelector('.displayStatistics');


function display() {
    statistics.innerHTML = "";

    const myResponse = responses.filter(response => response.userID === user.id);

    console.log(myResponse.length);

    const schools = [];

    myResponse.forEach(response => {
        //check if the school exist
        const existingSchool = schools.find(school => school === response.school);

        if (!existingSchool) {
            schools.push(response.school);
        }

    });

    console.log(schools.length);

    //pending questionnaires
    const pending = questionnaires.length - myResponse.length;
    console.log(pending);

    //create a statistics object
    const staticsData = {
        availableQuestionnaires: questionnaires.length,
        mySubmissions: myResponse.length,
        schoolsSurveyed: schools.length,
        pendingQuestionnaires: pending
    }

    const card = document.createElement('div');
    card.id = "staticsCard";

    card.innerHTML = `
    <div>
      <p>Available Questionnaires</p>
      <p>${staticsData.availableQuestionnaires}</p>
    </div>

    <div>
      <p>My Submissions</p>
       <p>${staticsData.mySubmissions}</p>
    </div>

     <div>
      <p>Schools Surveyed</p>
       <p>${staticsData.schoolsSurveyed}</p>
    </div>

     <div>
      <p>Pending Questionnaires</p>
       <p>${staticsData.pendingQuestionnaires}</p>
    </div>
    `

    statistics.appendChild(card);
}
display();