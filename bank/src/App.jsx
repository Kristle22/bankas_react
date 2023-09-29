import './bootstrap.css';
import './App.scss';
import DataContext from './Components/DataContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';

function App() {

  const [accounts, setAccounts] = useState([]);

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createAccount, setCreateAccount] = useState(null);

  const [deleteAccount, setDeleteAccount] = useState(null);

  const [modalAccount, setModalAccount] = useState(null);

  const [action, setAction] = useState('');
  const [editAccount, setEditAccount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/bankas_react/server/accounts')
      .then(res => {
        setAccounts(res.data);
      })
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createAccount) return;
    axios.post('http://localhost/bankas_react/server/accounts', createAccount)
      .then(res => setLastUpdate(Date.now()));
  }, [createAccount]);

  useEffect(() => {
    if (null === deleteAccount) return;
    axios.delete('http://localhost/bankas_react/server/accounts/' + deleteAccount.id)
      .then(res => setLastUpdate(Date.now()));
  }, [deleteAccount]);

  useEffect(() => {
    if (null === editAccount) return;
    axios.put('http://localhost/bankas_react/server/accounts/add/' + editAccount.id, editAccount)
      .then(res => setLastUpdate(Date.now()));
  }, [editAccount]);

  useEffect(() => {
    if (null === editAccount) return;
    axios.put('http://localhost/bankas_react/server/accounts/charge/' + editAccount.id, editAccount)
      .then(res => setLastUpdate(Date.now()));
  }, [editAccount]);


  return (
    <DataContext.Provider value={{
      accounts,
      setCreateAccount,
      setDeleteAccount,
      modalAccount,
      setModalAccount,
      action,
      setAction,
      setEditAccount
    }}>
      <div className="container">
        <div className="row">
          <Create />
          <List />
        </div>
      </div>
      <Edit />
    </DataContext.Provider>
  );
}

export default App;
