
const users = getUsers();
const CurrentAdmin = getCurrentAdmin();
console.log(getCurrentAdmin());
const welcome = document.getElementById('welcome');
welcome.textContent = `Welcome ${CurrentAdmin.username}`;

console.log(users[0].username);

const statistics = document.querySelector('.statistics');

function displayStatistics() {
    statistics.innerHTML = "";

    const statisticsDiv = document.createElement('div');
    statisticsDiv.id = 'statisticsDiv';
    statisticsDiv.innerHTML = `
          <p>Field Officers: ${users.length}</p>
        `
    statistics.appendChild(statisticsDiv);

}
displayStatistics();