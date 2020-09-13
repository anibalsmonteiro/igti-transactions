import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import css from './modalTransaction.module.css';

Modal.setAppElement('#root');

export default function ModalTransaction({
   onSave,
   onClose,
   selectedTransaction,
}) {
   const {
      _id,
      category,
      description,
      value,
      type,
      yearMonthDay,
   } = selectedTransaction;

   const [transactionCategory, setTransactionCategory] = useState(category);
   const [transactionDescription, setTransactionDescription] = useState(
      description
   );
   const [transactionValue, setTransactionValue] = useState(value);
   const [transactionType, setTransactionType] = useState(type);
   const [transactionDate, setTransactionDate] = useState(yearMonthDay);

   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      const minValue = 0;

      if (transactionValue < minValue) {
         setErrorMessage('Valor inválido para o lançamento');
         return;
      }

      setErrorMessage('');
   }, [
      transactionCategory,
      transactionDescription,
      transactionValue,
      transactionType,
      transactionDate,
   ]);

   useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   });

   const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
         onClose(null);
      }
   };

   const handleFormSubmit = (event) => {
      event.preventDefault();

      const formData = {
         _id,
         newCategory: transactionCategory,
         newDescription: transactionDescription,
         newValue: transactionValue,
         newType: transactionType,
         newDate: transactionDate,
      };

      onSave(formData);
   };

   const handleTransactionChange = ({ target }) => {
      const { value, id } = target;

      if (id === 'inputCategory') setTransactionCategory(value);

      if (id === 'inputDescription') setTransactionDescription(value);

      if (id === 'inputValue') setTransactionValue(+value);

      if (id === 'inputIncome') {
         setTransactionType('-');
      }
      if (id === 'inputExpense') {
         setTransactionType('+');
      }

      if (id === 'inputDate') setTransactionDate(value);
   };

   const handleModalClose = () => {
      onClose(null);
   };

   return (
      <div>
         <Modal isOpen={true}>
            <div className={css.flexRowTitle}>
               <span className={css.title}>Transactions</span>
               <button
                  className="waves-effect waves-light btn red dark-4"
                  onClick={handleModalClose}
               >
                  X
               </button>
            </div>

            <form onSubmit={handleFormSubmit}></form>

            <div className={css.flexRow}>
               <label>
                  <input
                     id="inputExpense"
                     name="type"
                     type="radio"
                     checked={transactionType === '+'}
                     onChange={handleTransactionChange}
                  />
                  <span>Receita</span>
               </label>
               <label>
                  <input
                     id="inputIncome"
                     name="type"
                     type="radio"
                     checked={transactionType === '-'}
                     onChange={handleTransactionChange}
                  />
                  <span>Despesa</span>
               </label>
            </div>

            <div className="input-field">
               <input
                  id="inputCategory"
                  type="text"
                  value={transactionCategory}
                  onChange={handleTransactionChange}
               />
               <label className="active" htmlFor="inputCategory">
                  Categoria
               </label>
            </div>

            <div className="input-field">
               <input
                  id="inputDescription"
                  type="text"
                  value={transactionDescription}
                  onChange={handleTransactionChange}
               />
               <label className="active" htmlFor="inputDescription">
                  Descrição
               </label>
            </div>

            <div className="input-field">
               <input
                  id="inputDate"
                  type="date"
                  className="datepicker"
                  value={transactionDate}
                  onChange={handleTransactionChange}
               />
               <label className="active" htmlFor="inputDate">
                  Data
               </label>
            </div>

            <div className="input-field">
               <input
                  id="inputValue"
                  type="number"
                  value={transactionValue}
                  step="1"
                  onChange={handleTransactionChange}
               />
               <label className="active" htmlFor="inputValue">
                  Valor
               </label>
            </div>

            <div className={css.flexRowTitle}>
               <button
                  className="waves-effect waves-light btn"
                  disabled={errorMessage.trim() !== ''}
                  onClick={handleFormSubmit}
               >
                  Gravar
               </button>
               <span className={css.errorMessage}>{errorMessage}</span>
            </div>
         </Modal>
      </div>
   );
}
