
let transactions = [
    { title: 'Salary', amount: 12000, type: 'Income' },
    { title: 'Utility bills', amount: 1000, type: 'Expense' },
];

const form = document.querySelector('#finance-form');
const transactionsTableBody = document.querySelector('#transactions tbody');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

const populateTransactions = () => {
    transactionsTableBody.innerHTML = transactions.map(item => 
                            `<tr>
                                <td>${item.title}</td>
                                <td>$${item.amount}</td>
                                <td>${item.type}</td>
                            </tr>`)
                        .join('');
}

const calculateTypeTotal = (type) => {
    const filteredTransactions = transactions.filter(transaction => transaction.type === type);
    const total = filteredTransactions.reduce((sum, t) => {
        return sum + (typeof t.amount === 'number' ? t.amount : 0);
    }, 0);

    return total;
}

const populateSummary = () => {
    const income = calculateTypeTotal('Income');
    const expenses = calculateTypeTotal('Expense');

    totalIncome.textContent = `$${income.toFixed(2)}`;
    totalExpenses.textContent = `$${expenses.toFixed(2)}`;
    balance.textContent = `$${(income - expenses).toFixed(2)}`;
}

const addTransaction = (newItem) => {
    console.log(newItem);
    transactions = [...transactions, newItem];
    populateTransactions();
    populateSummary();
}

populateTransactions();
populateSummary();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (data.title === '' || data.amount === '' || data.type === ''  || data.type === '#') {
        alert('Please fill in all fields');
        return;
    }

    const { title, type } = data;
    const amount = parseFloat(data.amount);

    addTransaction({ title, amount, type });
    form.reset();
});
