import React from 'react';
import css from './transaction.module.css';
import { formatNumber } from '../helpers/formatNumbers';

export default function Transaction({ transaction }) {
  const { day, category, description, value, type } = transaction;

  const style = type === '-' ? css.expense : css.income;

  return (
    <div>
      <div className={`${css.flexRow} ${style}`}>
        <div style={{ width: '5%', marginLeft: '5px' }}>{day}</div>
        <div style={{ width: '60%' }}>
          <div>{category}</div>
          <div>{description}</div>
        </div>
        <div style={{ width: '30%', right: 'right' }}>
          {formatNumber(value)}
        </div>

        <div style={{ width: '8%' }}>
          <button
            className="tiny btn-flat"
            style={{ width: '50%', marginRight: '10px', padding: '0px' }}
          >
            <i className="material-icons">edit</i>
          </button>

          <button
            style={{ marginRight: '5px', padding: '0px' }}
            className="btn-flat"
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
  );
}
