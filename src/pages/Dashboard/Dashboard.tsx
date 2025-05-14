import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './Dashboard.css';
import InputField from '../../components/InputField/InputField';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import Button from '../../components/Button/Button';
import CountrySelector from '../../components/CountrySelector/CountrySelector';
import DatePicker from '../../components/DatePicker/DatePicker';
import TransactionList from '../../components/TransactionList/TransactionList';
import Pagination from '../../components/Pagination/Pagination';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [description, setDescription] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  const [country, setCountry] = useState('brazil');
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isoDate = new Date(transactionDate).toISOString();

    const body = {
      description,
      transaction_value: parseFloat(transactionValue),
      transaction_date: isoDate
    };

    try {
      await api.post('/checkout', body);

      alert('Transação cadastrada com sucesso!');
      setDescription('');
      setTransactionValue('');
      setTransactionDate('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar transação');
    }
  };

    const handleFetchTransactions = async () => {
    try {
      const response = await api.get(`/checkout/transactions/country/${country}`, {
        params: {
          limit: 10,
          offset: (currentPage - 1) * 10,
          filter_transaction_date: transactionDate,
        },
      });

      setTransactions(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total / 10));
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  useEffect(() => {
    handleFetchTransactions();
  }, [country, transactionDate, currentPage]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-button" onClick={logout}>Sair</button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Bem-vindo!</h2>
          <p>Você está logado como: <strong>{user?.email}</strong></p>
        </div>

    <div className="info-card">
      <div className="info-card-title">
        <h2>Cadastrar Transação</h2>
        </div>
      
        <div className="transaction-card">
          
          <form onSubmit={handleSubmit}>
                <InputField
                label="Descrição"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />

                <InputField
                label="Valor"
                type="number"
                step="0.01"
                value={transactionValue}
                onChange={(e) => setTransactionValue(e.target.value)}
                required
                />

                <DateTimePicker
                label="Data e Hora"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                required
                />
                
            <Button type="submit" variant="success">Salvar Transação</Button>

          </form>
        </div>
        </div>
      </div>

       <div className="info-card">
          <div className="info-card-title">
            <h2>Consultar Transações</h2>
          </div>

          <div className="transaction-card">
            <form>
              <CountrySelector value={country} onChange={(e) => setCountry(e.target.value)} />
              <DatePicker value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
            </form>
          </div>

          <TransactionList transactions={transactions || []} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
};

export default Dashboard;
