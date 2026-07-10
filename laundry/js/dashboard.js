const customers = getCustomers();
const orders = getOrders();

console.log(customers.length);
console.log(orders.length);

const cards = [
    {
        icon: "fa-solid fa-users",
        text: "TOTAL CUSTOMERS",
        count: 1
    },
    {
        icon: "fa-solid fa-box-open",
        text: " TOTAL ORDERS",
        count: 2
    },
    {
        icon: "fa-solid fa-soap",
        text: "WASHING",
        count: 3
    },
    {
        icon: "fa-solid fa-wind",
        text: "DRYING",
        count: 4
    },
    {
        icon: "fa-solid fa-circle-check",
        text: "READY",
        count: 5
    },
    {
        icon: "fa-solid fa-box-archive",
        text: "COLLECTED",
        count: 6
    },
];

console.log(cards.length);

function displayCards() {
    const statisticCards = document.getElementById("statistic-cards");
    statisticCards.innerHTML = "";

    cards.forEach(card => {
        const cardContent = document.createElement("div")
        cardContent.innerHTML = `
          <div class="card">
                <i class="${card.icon}"></i>
                <h5 class="card-text">${card.text}</h5>
                <h2><span class="count">${card.count}</span></h2>
            </div>
        </div>
        `
        statisticCards.appendChild(cardContent);
    })

}

displayCards();