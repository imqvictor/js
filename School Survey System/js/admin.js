
const CurrentAdmin = getCurrentAdmin();
console.log(getCurrentAdmin());
const wellcome = document.getElementById('wellcome');
wellcome.textContent = `Wellcome ${CurrentAdmin.username}`;
