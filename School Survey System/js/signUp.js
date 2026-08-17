const users = getUsers();
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPwdInput = document.getElementById('confirmPwd');
const submitBtn = document.getElementById('submitBtn');
const umessage = document.getElementById('umessage');
const pmessage = document.getElementById('pmessage');
const succesfull = document.getElementById('succesfull');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addUsers();
});

function addUsers() {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPwd = confirmPwdInput.value.trim();

    if (password !== confirmPwd) {
        pmessage.textContent = "password missmatch";
    } else {
        const existingUser = users.find(usr => usr.username === username);

        if (existingUser) {
            umessage.textContent = "user already exist";
        } else {
            const user = {
                id: Date.now(),
                username: username,
                email: email,
                password: password,
                role: "user"
            }
            users.push(user);
            localStorage.setItem('user', JSON.stringify(users));
            succesfull.textContent = "user registered succesfully";

            usernameInput.value = "";
            passwordInput.value = "";
            emailInput.value = "";
            confirmPwdInput.value = "";
            pmessage.textContent = "";
            umessage.textContent = "";
            console.log(users.length);
        }
    }

}