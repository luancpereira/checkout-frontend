import React from 'react';
import './TransactionList.css';

interface Transaction {
  id: number;
  description: string;
  transaction_value: number;
  transaction_date: string;
  transaction_value_converted_to_wish_currency: number;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <span>Descrição</span>
        <span>Valor</span>
        <span>Data</span>
        <span>Valor Convertido</span>
      </div>
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-list-row">
          <span>{transaction.description}</span>
          <span>R$ {transaction.transaction_value.toFixed(2)}</span>
          <span>{new Date(transaction.transaction_date).toLocaleString()}</span>
          <span>R$ {transaction.transaction_value_converted_to_wish_currency.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
