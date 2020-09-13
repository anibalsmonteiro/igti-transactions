import React from 'react';
import css from './transaction.module.css';
import { formatNumber } from '../helpers/formatNumbers';
import Action from './Action';

export default function Transaction({ onActionClick, transaction }) {
  const { _id, day, category, description, value, type } = transaction;

  const style = type === '-' ? css.expense : css.income;

  return (
    <div>
      <div className={`${css.flexRow} ${style}`}>
        <div className={css.day}>{day}</div>

        <div style={{ width: '60%' }}>
          <div className={css.category}>{category}</div>
          <div>{description}</div>
        </div>

        <div className={css.value}>{formatNumber(value)}</div>

        <div style={{ width: '8%' }}>
          <Action
            id={_id}
            type={'edit'}
            currentTransaction={transaction}
            onActionClick={onActionClick}
          ></Action>
          <Action
            id={_id}
            type={'delete'}
            currentTransaction={transaction}
            onActionClick={onActionClick}
          ></Action>
        </div>
      </div>
    </div>
  );
}
