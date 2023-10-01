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

  const [transfer, setTransfer] = useState(null);

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
    if (null === transfer) return;
    axios.put('http://localhost/bankas_react/server/accounts/add/' + transfer.id, transfer)
      .then(res => setLastUpdate(Date.now()));
  }, [transfer]);

  // useEffect(() => {
  //   if (null === transfer) return;
  //   axios.put('http://localhost/bankas_react/server/accounts/charge/' + transfer.id, transfer)
  //     .then(res => setLastUpdate(Date.now()));
  // }, [transfer]);


  return (
    <DataContext.Provider value={{
      accounts,
      setCreateAccount,
      setDeleteAccount,
      modalAccount,
      setModalAccount,
      setTransfer
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
