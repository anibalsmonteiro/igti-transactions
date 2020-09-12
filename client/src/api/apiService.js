import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction/';

// const TRANSACTION_VALIDATION = [
//   {
//     type: ['-', '+'],
//   },
// ];

async function getAllTransactions(yearMonth) {
  const route = API_URL + `findAllByPeriod/${yearMonth}`;
  const res = await axios.get(route);

  const transactions = res.data.map((transaction) => {
    return {
      ...transaction,
    };
  });

  transactions.sort((a, b) => a.yearMonthDay.localeCompare(b.yearMonthDay));

  return transactions;
}

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data.id;
}

async function updateTransaction(transaction) {
  const response = await axios.put(API_URL, transaction);
  return response.data;
}

async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/${transaction.id}`);
  return response.data;
}

// async function getValidationFromTransactionType(transactionType) {
//   const transactionValidation = TRANSACTION_VALIDATION.find(
//     (item) => item.type === transactionType
//   );

//   return transactionValidation.type;
// }

export {
  getAllTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
