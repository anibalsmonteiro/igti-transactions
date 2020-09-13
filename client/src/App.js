import React, { useState, useEffect } from 'react';
import YearMonth from './components/YearMonth';
import Resume from './components/Resume';
import TransactionsControl from './components/TransactionsControl';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import M from 'materialize-css';
import ModalTransaction from './components/ModalTransaction';

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
  const [selectedTransaction, setselectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions(selectedYearMonth);

      setTimeout(() => {
        setAllTransactions(transactions);
      }, 0);
    };

    getTransactions();
  }, [selectedYearMonth]);

  const handleDelete = async (id) => {
    const isDeleted = await api.deleteTransaction(id);

    if (isDeleted.status === 200) {
      const deletedTransactionIndex = allTransactions.findIndex(
        (transaction) => transaction._id === id
      );

      if (deletedTransactionIndex >= 0) {
        const updatedTransactions = Object.assign([], allTransactions);

        updatedTransactions.splice(deletedTransactionIndex, 1);

        setAllTransactions(updatedTransactions);
      }
    }
  };

  const handlePersist = (transaction) => {
    setselectedTransaction(transaction);
    setIsModalOpen(true);

    if (transaction) {
    } else {
      console.log('handleInsert');
    }
  };

  const handlePersistData = () => {};

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleYearMonthChange = (event) => {
    let yearMonth = convertNumericMonth(event.target.value);
    setSelectedYearMonth(yearMonth);
  };

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

      {allTransactions.length === 0 && <Spinner />}

      {allTransactions.length > 0 && <Resume transactions={allTransactions} />}

      {allTransactions.length > 0 && (
        <TransactionsControl
          transactions={allTransactions}
          isModalOpen={isModalOpen}
          onDelete={handleDelete}
          onPersist={handlePersist}
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
