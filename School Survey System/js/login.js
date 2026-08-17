
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const umessage = document.getElementById('umessage');
const pmessage = document.getElementById('pmessage');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

/*
This is a form event handler.

The (event) parameter represents the event object
created when the form is submitted.

event.preventDefault() tells the browser to stop
the form's default submission behavior so JavaScript
can handle the submission itself.
*/

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    console.log(username);
    console.log(password);


    const users = [
        //we have a default admin hence a user can't register himself as an admin
        {
            id: 0,
            username: "admin",
            password: "admin123",
            role: "admin"
        },
        //we use the spread operator to spread the the users array so that we can have one array
        ...getUsers(),
    ];

    console.log(users.length);
    console.log(users);
    //check if user name and password match
    const foundUser = users.find(user => user.username === username && user.password === password);


    if (foundUser) {
        console.log(foundUser);
        if (foundUser.role === "admin") {
            console.log("open admins page");

            //store the admin
            /*Before storing the admin destructure the object so as to remove the password */
            const { password, ...currentAdmin } = foundUser;
            localStorage.setItem('cAdmin', JSON.stringify(currentAdmin));

            //navigate to the admins dashboard
            window.location.href = "admin/adminDashboard.html";

        } else if (foundUser.role === "user") {
            console.log("open users page");

            //store the user
            /*Object destructuring before storage remove the password from the object*/
            const { password, ...currentUser } = foundUser;
            localStorage.setItem('cUser', JSON.stringify(currentUser));
            //navigate to the users dashboard
            window.location.href = "user/userDashboard.html";
        }
    } else {
        umessage.textContent = "incorrect username or password";
        console.log("username or password not found");
    }

    usernameInput.value = "";
    passwordInput.value = "";
});
