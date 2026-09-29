
const team = document.getElementById('team');
const sport = document.getElementById('sport');
const year = document.getElementById('year');
const hCoach = document.getElementById('hCoach');
const filterTeam = document.getElementById('filterTeam');
const displayCards = document.querySelector('.display-cards');
const filterLeague = document.getElementById('filterLeague');


async function searchLeagues() {

    const request = "http://localhost:3000/api/leagues";
    const response = await fetch(request);

    if (!response.ok) {
        console.log("Error:", response.status);
        console.log(await response.text());
        return;
    }

    const data = await response.json();
    console.log(data);

    console.log(data.data[0].name);

    function displayLeagues() {

        const allLeagues = data.data;

        filterLeague.addEventListener('change', () => {
            displayCards.innerHTML = "";

            allLeagues.forEach(league => {
                const leagues = document.createElement('div');
                leagues.className = "leagues";
                leagues.innerHTML = `
            <img src="${league.image_path}" width=100 height=100" alt="${league.name}">
            <p>${league.name}</p>
            `;

                const selectedLeague = filterLeague.value;
                console.log(selectedLeague);

                if (selectedLeague === "All" || league.name === selectedLeague) {
                    displayCards.appendChild(leagues);
                }

            });

        });
    }

    displayLeagues();
}
searchLeagues();

async function searchTeams() {

    const response = await fetch("http://localhost:3000/api/teams");
    const data = await response.json();

    console.log(data);

    const allTeams = data.data;



    filterTeam.addEventListener('change', () => {
        displayCards.innerHTML = "";

        allTeams.forEach(team => {

            const teamsCard = document.createElement('div');
            teamsCard.className = "teamsCard";
            teamsCard.innerHTML = `
        <img src="${team.image_path}" width=100 height=100" alt="${team.name}">
        <p>${team.name}</p>
        `;

            const selectedTeam = filterTeam.value;
            console.log(selectedTeam);

            if (selectedTeam === "All" || team.name === selectedTeam) {
                displayCards.appendChild(teamsCard);
            }

        });

    });

}
searchTeams();

async function searchTeamDetails() {

    const response = await fetch("http://localhost:3000/api/teams/53");
    const data = await response.json();

    console.log(data);

}
searchTeamDetails();