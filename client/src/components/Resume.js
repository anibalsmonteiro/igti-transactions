import React from 'react';
import css from './resume.module.css';
import { formatNumber } from '../helpers/formatNumbers';

export default function Resume({ transactions }) {
  const calculateTotalIncomes = (transactions) => {
    const totalIncomes = transactions.reduce((acc, curr) => {
      let value = curr.type === '+' ? curr.value : 0;
      return acc + value;
    }, 0);

    return totalIncomes;
  };

  const calculateTotalExpenses = (transactions) => {
    const totalExpenses = transactions.reduce((acc, curr) => {
      let value = curr.type === '-' ? curr.value : 0;
      return acc + value;
    }, 0);

    return totalExpenses;
  };

  const lancamentos = transactions.length;
  const expenses = calculateTotalExpenses(transactions);
  const incomes = calculateTotalIncomes(transactions);
  const saldo = incomes - expenses;

  return (
    <div className={css.flexRow}>
      <div>Lançamentos: {lancamentos}</div>
      <div>Receitas: {formatNumber(incomes)}</div>
      <div>Despesas: {formatNumber(expenses)}</div>
      <div>Saldo: {formatNumber(saldo)}</div>
    </div>
  );
}
