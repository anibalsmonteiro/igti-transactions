import React from 'react';
import css from './resume.module.css';

export default function Resume() {
  return (
    <div className={css.flexRow}>
      <div>Lançamentos:</div>
      <div>Receitas:</div>
      <div>Despesas:</div>
      <div>Saldo:</div>
    </div>
  );
}
