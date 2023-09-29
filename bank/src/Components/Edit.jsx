import { useContext, useState, useEffect } from "react";
import DataContext from './DataContext';

function Edit() {

  const { modalAccount, setModalAccount, sum, setSum, setEditAccount } = useContext(DataContext);

  const [Nr, setNr] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [PC, setPC] = useState('');
  const [deposit, setDeposit] = useState('');

  const close = () => {
    setModalAccount(null);
  }

  useEffect(() => {
    if (null === modalAccount) return;
    setNr(modalAccount.Nr);
    setName(modalAccount.name);
    setSurname(modalAccount.surname);
    setPC(modalAccount.PC);
    setDeposit(modalAccount.deposit);

  }, [modalAccount]);

  const handleEdit = () => {
    setEditAccount({ id: modalAccount.id, Nr, name, surname, PC, sum });
    setModalAccount(null);
  }

  if (null === modalAccount) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Edit</h2>
            <button type="button" className="close" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="card mt-4">
              <div className="card-body">
                <div className="form-group">
                  <h2>{Nr}</h2>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Surname</label>
                  <input type="text" className="form-control" value={surname} onChange={e => setSurname(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Personal Code</label>
                  <input type="text" className="form-control" value={PC} onChange={e => setPC(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" value={sum} onChange={e => setSum(e.target.value)} placeholder="EUR" />
                  <small className="form-text text-muted">Account Balance: {deposit} Eur.</small>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-success" onClick={handleEdit}>Save changes</button>
            <button type="button" className="btn btn-outline-secondary" onClick={close}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;