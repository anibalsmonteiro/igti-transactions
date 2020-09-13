import React, { useState, useEffect } from 'react';
import YearMonth from './components/YearMonth';
import Resume from './components/Resume';
import TransactionsControl from './components/TransactionsControl';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import M from 'materialize-css';
import ModalTransaction from './components/ModalTransaction';
import { formatYearMonth, formatYearMonthDay } from './helpers/formatDates';

export default function App() {
   useEffect(() => {
      M.AutoInit();
   }, []);

   //prettier-ignore
   const months = [
    'Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez',
  ];

   const years = [2019, 2020, 2021];

   function populateComboList() {
      let yearMonths = [];

      years.forEach((year) => {
         months.forEach((_, index) => {
            index++;
            let _index = index < 10 ? `0${index}` : `${index}`;
            yearMonths.push(`${year}-${_index}`);
         });
      });

      return yearMonths;
   }

   function convertNumericMonth(item) {
      let index = item.substring(5, 8);

      index = months.findIndex((month) => month === index);
      index++;
      let month = index < 10 ? `0${index}` : `${index}`;

      let year = item.substring(0, 4);

      return `${year}-${month}`;
   }

   const getCurrentYearMonth = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;

      month = month < 10 ? `0${month}` : `${month}`;

      return `${year}-${month}`;
   };

   const currentYearMonth = getCurrentYearMonth();
   const comboList = populateComboList();

   const [selectedYearMonth, setSelectedYearMonth] = useState(currentYearMonth);
   const [allTransactions, setAllTransactions] = useState([]);
   const [filteredTransactions, setFilteredTransactions] = useState([]);
   const [selectedTransaction, setselectedTransaction] = useState(
      api.createTransactionModel()
   );
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isSpinnerLoading, setIsSpinnerLoading] = useState(true);

   useEffect(() => {
      setIsSpinnerLoading(true);

      const getTransactions = async () => {
         const transactions = await api.getAllTransactions(selectedYearMonth);

         console.log(transactions);
         setAllTransactions(transactions);
         setIsSpinnerLoading(false);
         setFilteredTransactions(Object.assign([], transactions));
         console.log(transactions);
      };

      getTransactions();
   }, [selectedYearMonth, isModalOpen]);

   const handleDelete = async (id) => {
      const isDeleted = await api.deleteTransaction(id);

      if (isDeleted.status === 200) {
         const deletedTransactionIndex = filteredTransactions.findIndex(
            (transaction) => transaction._id === id
         );

         if (deletedTransactionIndex >= 0) {
            const updatedTransactions = Object.assign([], filteredTransactions);

            updatedTransactions.splice(deletedTransactionIndex, 1);

            setFilteredTransactions(updatedTransactions);
            setAllTransactions(updatedTransactions);
         }
      }
   };

   const handlePersist = (transaction) => {
      if (!transaction) setselectedTransaction(api.createTransactionModel());
      else setselectedTransaction(transaction);

      setIsModalOpen(true);
   };

   const handlePersistData = async (formData) => {
      const {
         _id,
         newCategory,
         newDescription,
         newValue,
         newType,
         newDate,
      } = formData;

      const newTransactions = Object.assign([], filteredTransactions);

      console.log(newDate);
      const newYear = new Date(newDate).getFullYear();
      const newMonth = new Date(newDate).getMonth() + 1;
      const newDay = new Date(newDate).getDate() + 1;

      const newYearMonth = formatYearMonth(new Date(newDate));
      const newYearMonthDay = formatYearMonthDay(new Date(newDate));

      let transactionToPersist = {};

      if (!_id) transactionToPersist = api.createTransactionModel();
      else {
         transactionToPersist = newTransactions.find(
            (transaction) => transaction._id === _id
         );
      }

      transactionToPersist.category = newCategory;
      transactionToPersist.description = newDescription;
      transactionToPersist.type = newType;
      transactionToPersist.value = newValue;
      transactionToPersist.year = newYear;
      transactionToPersist.month = newMonth;
      transactionToPersist.day = newDay;
      transactionToPersist.yearMonth = newYearMonth;
      transactionToPersist.yearMonthDay = newYearMonthDay;

      console.log(transactionToPersist);

      if (!_id) {
         await api.insertTransaction(transactionToPersist);
      } else await api.updateTransaction(transactionToPersist);

      setIsModalOpen(false);
   };

   const handleClose = () => {
      setIsModalOpen(false);
   };

   const handleYearMonthChange = (event) => {
      let yearMonth = convertNumericMonth(event.target.value);
      setSelectedYearMonth(yearMonth);
   };

   const handleDescriptionToSearch = (description) => {
      setFilteredTransactions(
         description
            ? allTransactions.filter((transaction) => {
                 return transaction.description
                    .toLowerCase()
                    .includes(description.toLowerCase());
              })
            : allTransactions
      );

      console.log(allTransactions);
      console.log(filteredTransactions);
   };

   //  const handleChangeFilter = (newText) => {
   //     setUserFilter(newText);

   //     const filterLowerCase = newText.toLowerCase();

   //     const filteredCountries = allCountries.filter((country) => {
   //        return country.filterName.includes(filterLowerCase);
   //     });

   //     const filteredPopulation = calculateTotalPopulationFrom(
   //        filteredCountries
   //     );

   //     setFilteredCountries(filteredCountries);
   //     setFilteredPopulation(filteredPopulation);
   //  };

   return (
      <div className={'container'}>
         <h1 style={css.h1}>Bootcamp Full Stack - Desafio Final</h1>
         <h2 style={css.h2}>Controle Financeiro Pessoal</h2>

         <YearMonth
            comboList={comboList}
            currentYearMonth={selectedYearMonth}
            handleYearMonthChange={handleYearMonthChange}
            isModalOpen={isModalOpen}
         />

         {isSpinnerLoading && <Spinner />}

         {!isSpinnerLoading && <Resume transactions={filteredTransactions} />}

         {!isSpinnerLoading && (
            <TransactionsControl
               transactions={filteredTransactions}
               isModalOpen={isModalOpen}
               onDelete={handleDelete}
               onPersist={handlePersist}
               onSearch={handleDescriptionToSearch}
            />
         )}

         {isModalOpen && (
            <ModalTransaction
               onSave={handlePersistData}
               onClose={handleClose}
               selectedTransaction={selectedTransaction}
            />
         )}
      </div>
   );
}
const css = {
   h1: {
      fontSize: '2em',
      fontWeight: 'bolder',
      textAlign: 'center',
   },
   h2: {
      fontSize: '1.5em',
      textAlign: 'center',
   },
};
