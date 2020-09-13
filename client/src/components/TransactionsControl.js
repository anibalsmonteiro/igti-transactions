import React from 'react';
import css from './transactionsControl.module.css';
import Transaction from './Transaction';
import Action from './Action';

export default function TransactionsControl({
  transactions,
  onDelete,
  onPersist,
  isModalOpen,
}) {
  const handleActionClick = (id, type, transaction) => {
    if (!type) {
      onPersist(0);
    } else if (type === 'edit') {
      onPersist(transaction);
    }
    if (type === 'delete') {
      onDelete(id);
    }
  };

  return (
    <div>
      <div className={css.flexRow}>
        <div className="input-field" style={{ width: '80%' }}>
          <input placeholder="Filtro" id="searchText" type="text" />
        </div>

        {!isModalOpen && (
          <button
            className="waves-effect waves-light btn-small"
            style={{ marginLeft: '10px', width: '200px' }}
            onClick={handleActionClick}
          >
            <i className="material-icons left">add</i>NOVO LANÇAMENTO
          </button>
        )}
      </div>

      {transactions.map((transaction) => {
        return (
          <Transaction
            onActionClick={handleActionClick}
            transaction={transaction}
            key={transaction._id}
          />
        );
      })}
    </div>
  );
}
