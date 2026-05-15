
const quotes = [
    {
        quote: "Stay hungry, stay foolish.",
        author: "Steve Jobs"
    },
    {
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        quote: "Code is like humor. When you have to explain it, it’s bad.",
        author: "Cory House"
    },
    {
        quote: "Programs must be written for people to read.",
        author: "Harold Abelson"
    },
    {
        quote: "Experience is the name everyone gives to their mistakes.",
        author: "Oscar Wilde"
    },
    {
        quote: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman"
    },
    {
        quote: "JavaScript is the duct tape of the Internet.",
        author: "Charlie Campbell"
    },
    {
        quote: "Knowledge is power.",
        author: "Francis Bacon"
    },
    {
        quote: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },
    {
        quote: "Success is not final; failure is not fatal.",
        author: "Winston Churchill"
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        quote: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },
    {
        quote: "Great things never come from comfort zones.",
        author: "Unknown"
    },
    {
        quote: "Push yourself, because no one else is going to do it for you.",
        author: "Unknown"
    },
    {
        quote: "Small steps every day lead to big results.",
        author: "Unknown"
    }
];

const but = document.querySelector("#btn");
but.addEventListener('click', random);

function random() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const post = document.querySelector('#q');
    post.textContent = quotes[randomIndex].quote;
}
