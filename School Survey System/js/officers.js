const user = getCurrentUser();
const welcome = document.getElementById('welcome');
welcome.textContent = `Welcome ${user.username}`;