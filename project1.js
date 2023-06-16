document.addEventListener('DOMContentLoaded', function() {
    // Retrieve expenses from local storage or create an empty array
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to render expenses in the list
    function renderExpenses() {
        var expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = '';

        expenses.forEach(function(expense, index) {
            var listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
          <span class="expense-name">${expense.name}</span>
          <span class="expense-amount">$${expense.amount}</span>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        `;
            expenseList.appendChild(listItem);
        });
    }

    // Function to add a new expense
    function addExpense(name, amount) {
        var expense = {
            name: name,
            amount: parseFloat(amount)
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        renderExpenses();
    }

    // Function to delete an expense
    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        renderExpenses();
    }

    // Handle form submission
    var expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var expenseName = document.getElementById('expenseName').value;
        var expenseAmount = document.getElementById('expenseAmount').value;

        addExpense(expenseName, expenseAmount);

        expenseForm.reset();
    });

    // Handle delete button clicks
    var expenseList = document.getElementById('expenseList');
    expenseList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            var index = e.target.getAttribute('data-index');
            deleteExpense(index);
        }
    });

    // Render initial expenses
    renderExpenses();
});