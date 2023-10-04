import './bootstrap.css';
import './App.scss';
import DataContext from './Components/DataContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Components/Create';
import List from './Components/List';
import Add from './Components/Add';
import Charge from './Components/Charge';
import Home from './Components/Home';
import Messages from './Components/Messages';
import rand from './Functions/rand';

function App() {

  const [userName, setUserName] = useState('');

  const [accounts, setAccounts] = useState([]);

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createAccount, setCreateAccount] = useState(null);

  const [deleteAccount, setDeleteAccount] = useState(null);

  const [modalAdd, setModalAdd] = useState(null);
  const [modalCharge, setModalCharge] = useState(null);

  const [addFunds, setAddFunds] = useState(null);
  const [chargeFunds, setChargeFunds] = useState(null);

  const [messages, setMessages] = useState([]);

  // const showMessage = (mes) => {
  //   setMessages(mes);
  //   setTimeout(() => setMessages(null), 5000);
  // };

  const showMessage = (m) => {
    // const id = uuidv4();
    const id = rand(1000, 9999);
    m.id = id;
    setMessages((msg) => [...msg, m]);
    setTimeout(() => {
      setMessages((msg) => msg.filter((m) => m.id !== id));
    }, 5000);
  };

  useEffect(() => {
    axios.get('http://localhost/bankas_react/server/public/accounts/home')
      .then(res => {
        setUserName(res.data.user);
      })
  }, [lastUpdate]);

  useEffect(() => {
    axios.get('http://localhost/bankas_react/server/public/accounts')
      .then(res => {
        setAccounts(res.data);
      })
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createAccount) return;
    axios.post('http://localhost/bankas_react/server/public/accounts', createAccount)
      .then(res => {
        setLastUpdate(Date.now());
        showMessage(res.data.msg);
        console.log(res.data);
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [createAccount]);

  useEffect(() => {
    if (null === deleteAccount) return;
    axios.delete('http://localhost/bankas_react/server/public/accounts/' + deleteAccount.id)
      .then(res => {
        setLastUpdate(Date.now());
        showMessage(res.data.msg);
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [deleteAccount]);

  useEffect(() => {
    if (null === addFunds) return;
    axios.put('http://localhost/bankas_react/server/public/accounts/add/' + addFunds.id, addFunds)
      .then(res => {
        setLastUpdate(Date.now());
        showMessage(res.data.msg);
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [addFunds]);

  useEffect(() => {
    if (null === chargeFunds) return;
    axios.put('http://localhost/bankas_react/server/public/accounts/charge/' + chargeFunds.id, chargeFunds)
      .then(res => {
        setLastUpdate(Date.now());
        showMessage(res.data.msg);
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [chargeFunds]);


  return (
    <DataContext.Provider value={{
      userName,
      accounts,
      setCreateAccount,
      setDeleteAccount,
      modalAdd,
      setModalAdd,
      modalCharge,
      setModalCharge,
      setAddFunds,
      setChargeFunds,
      messages
    }}>
      <div className="container">
        <div className="row">
          <Home />
          <Create />
          <List />
        </div>
      </div>
      <Add />
      <Charge />
      <Messages />
    </DataContext.Provider>
  );
}

export default App;
