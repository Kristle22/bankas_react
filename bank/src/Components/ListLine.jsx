function ListLine({ account, setDelete, setModalAdd, setModalCharge }) {

  const handleDelete = () => {
    setDelete(account);
  }

  const handleModalAdd = () => {
    setModalAdd(account);
  }

  const handleModalCharge = () => {
    setModalCharge(account);
  }

  return (
    <li className="list-group-item" key={account.id}>
      <div className="one-item">
        <div className="one-item__content">
          <span>{account.Nr}</span>
          <i>{account.name} {account.surname}</i>
          <b>{account.PC}</b>
          <span><i>Balance: <b>{account.deposit}</b> Eur.</i></span>
        </div>
        <div className="one-item__buttons">
          <button type="button" className="btn btn-outline-success mr-3" onClick={handleModalAdd}>Add</button>
          <button type="button" className="btn btn-outline-success mr-3" onClick={handleModalCharge}>Charge</button>
          <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );

}

export default ListLine;