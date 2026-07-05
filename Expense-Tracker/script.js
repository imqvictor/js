const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const amountEntered = document.getElementById('amount');
const descriptionEntered = document.getElementById('description');
const dateEntered = document.getElementById('date');
const categoryEntered = document.getElementById('category');
const addExpenseBtn = document.getElementById("addExpense");
let editExpenseId = null;

function addExpense() {
    const amount = amountEntered.value.trim();
    const date = dateEntered.value.trim();
    const category = categoryEntered.value.trim();
    const description = descriptionEntered.value.trim();

    if (amount === "") {
        alert("please Enter Amount");
        return false;
    } else if (isNaN(amount)) {
        alert("Please enter a valid number");
        return false;
    }

    if (description === "") {
        alert("Enter a description");
        return false;
    }

    if (category === "") {
        alert("Please select a category");
        return false;
    }

    if (date === "") {
        alert("please Enter a date");
        return false;
    }

    const expense = {
        id: expenses.length + 1,
        amount: amount,
        date: date,
        description: description,
        category: category
    }

    if (editExpenseId === null) {
        expenses.push(expense);
    } else if (editExpenseId !== null) {
        const expense = expenses.find(expense => expense.id === editExpenseId);

        if (expense) {
            expense.amount = amount;
            expense.description = description;
            expense.date = date;
            expense.category = category;
        }

        editExpenseId = null;
        addExpenseBtn.textContent = "Add Expense";
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));

    amountEntered.value = "";
    descriptionEntered.value = "";
    dateEntered.value = "";
    categoryEntered.value = "";

    UpdateTotal();
    displayExpenses(expenses);
}

addExpenseBtn.addEventListener('click', addExpense);

console.log(expenses.length);


function displayExpenses(expensesToDisplay = expenses) {
    // Implementation for displaying expenses
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    expensesToDisplay.forEach(expense => {
        const lists = document.createElement('li');
        lists.textContent = `
        Amount:${expense.amount},
        Description:${expense.description},
        Category:${expense.category},
        Date:${expense.date}
        `

        const edit = document.createElement('button');
        edit.textContent = 'Edit';
        edit.addEventListener('click', () => editExpense(expense.id));
        const delet = document.createElement('button');
        delet.textContent = 'Delete';
        delet.addEventListener('click', () => deleteExpense(expense.id));

        expenseList.appendChild(lists);
        expenseList.appendChild(edit);
        expenseList.appendChild(delet);
    });

}
displayExpenses();

function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);

    if (!expense) return;

    amountEntered.value = expense.amount;
    descriptionEntered.value = expense.description;
    dateEntered.value = expense.date;
    categoryEntered.value = expense.category;

    editExpenseId = expense.id;

    addExpenseBtn.textContent = "Update Expense";
}

function UpdateTotal() {
    const expenseTotal = document.getElementById('total-expenses');
    expenseTotal.textContent = expenses.length;
}
UpdateTotal();

function deleteExpense(id) {
    const idIndex = expenses.findIndex(expense => expense.id === id);

    if (idIndex !== -1) {
        expenses.splice(idIndex, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
        UpdateTotal();
    }
}


//searck and filter
const searchInput = document.getElementById("search");
searchInput.addEventListener('input', searchExpense);

function searchExpense() {
    const searchText = searchInput.value.toLowerCase().trim();


    const filteredSearch = expenses.filter(expense =>
        expense.description.toLowerCase().includes(searchText)
        ||
        expense.amount.toString().includes(searchText)
        ||
        expense.date.toString().includes(searchText)
        ||
        expense.category.toLowerCase().includes(searchText)
    );
    displayExpenses(filteredSearch);
}


const filter = document.getElementById("filter");
filter.addEventListener('change', filteredExpenses);

function filteredExpenses() {
    const filterValue = filter.value.toLowerCase();

    let filteredExpenses;
    if (filterValue === "all") {
        filteredExpenses = expenses;
    } else {
        filteredExpenses = expenses.filter(expense => expense.category === filterValue);
    }

    displayExpenses(filteredExpenses);
}



