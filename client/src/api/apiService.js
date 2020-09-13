import axios from 'axios';
import { formatYearMonth, formatYearMonthDay } from '../helpers/formatDates';
import Transaction from '../components/Transaction';

const API_URL = 'http://localhost:3001/api/transaction/';

// const TRANSACTION_VALIDATION = [
//   {
//     type: ['-', '+'],
//   },
// ];

function createTransactionModel() {
   const newDate = new Date();

   const year = newDate.getFullYear();
   let month = newDate.getMonth() + 1;
   let day = newDate.getDate() + 1;

   const yearMonth = formatYearMonth(newDate);
   const yearMonthDay = formatYearMonthDay(newDate);

   const transactionModel = {
      description: '',
      value: 0,
      category: '',
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type: '-',
   };

   return transactionModel;
}

function sortTransactions(transactions) {
   transactions.sort((a, b) => b.type.localeCompare(a.type));
   transactions.sort((a, b) => a.yearMonthDay.localeCompare(b.yearMonthDay));
   return transactions;
}

async function getAllTransactions(yearMonth, description) {
   const query = description ? `?description=${description}` : ``;

   const route = API_URL + `findAllByPeriod/${yearMonth}${query}`;
   const res = await axios.get(route);

   const transactions = res.data.map((transaction) => {
      return {
         ...transaction,
      };
   });

   sortTransactions(transactions);

   return transactions;
}

async function insertTransaction(transaction) {
   const response = await axios.post(API_URL, transaction);
   return response.data.id;
}

async function updateTransaction(transaction) {
   const { _id } = transaction;
   const response = await axios.put(`${API_URL}${_id}`, transaction);
   return response.data;
}

async function deleteTransaction(id) {
   let res = '';
   try {
      res = await axios.delete(`${API_URL}${id}`);
   } catch (err) {
      res = 500;
   }
   return res;
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
   createTransactionModel,
   sortTransactions,
};
