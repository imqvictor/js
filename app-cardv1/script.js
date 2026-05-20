const items = [
    {
        img: "dropbox.svg",
        name: "Dropbox"
    },
    {
        img: "github.svg",
        name: "Github"
    },
    {
        img: "jira.svg",
        name: "Jira"
    },
    {
        img: "slack.svg",
        name: "Slack"
    },
    {
        img: "teams.svg",
        name: "Teams"
    },
    {
        img: "trello.svg",
        name: "Trello"
    },

];

const wrapper = document.querySelector('.apps');


(function init() {
    wrapper.innerHTML = innerHT();
})();
function innerHT() {
    let content = "";
    items.forEach((item) => {
        content += `
         <div class="apps">
            <div class="img-wrapper">
                <img src="assets/${item.img}" alt="drop box" width="50px">
                <p class="desc">${item.name}</p>
                <button class="btn">
                    <img src="assets/plus.svg" alt="plus" width="50px">
                    <p>ADD</p>
                </button>
            </div>
        </div>
                `

    })
    return content;
}