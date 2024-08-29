import axios from "axios";

const BACKEND_URL = "https://expense-app-7930a-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + "/expense.json", expenseData);
  return response.data.name;
}

export async function getExpenses() {
  const responses = await axios.get(BACKEND_URL + "/expense.json");
  const expenses = [];
  console.log(responses.data);

  for (const key in responses.data) {
    const expensesObj = {
      id: key,
      amount: responses.data[key].amount,
      date: new Date(responses.data[key].date),
      description: responses.data[key].description,
    };
    expenses.push(expensesObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL+`/expense/${id}.json`,expenseData);
}

export function deleteExpense(id){
    return axios.delete(BACKEND_URL+`/expense/${id}.json`)
}
