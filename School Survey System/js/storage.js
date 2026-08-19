function getUsers() {
    return JSON.parse(localStorage.getItem('user')) || [];
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('cUser'));
}
function getCurrentAdmin() {
    return JSON.parse(localStorage.getItem('cAdmin'));
}

function getQuestionnaire() {
    return JSON.parse(localStorage.getItem('questionnaire')) || [];
}