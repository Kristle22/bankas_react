import { useContext, useState, useEffect } from "react";
import DataContext from './DataContext';

function Charge() {

  const { modalCharge, setModalCharge, setChargeFunds } = useContext(DataContext);

  const [Nr, setNr] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [PC, setPC] = useState('');
  const [deposit, setDeposit] = useState('');
  const [sum, setSum] = useState('');

  const close = () => {
    setModalCharge(null);
  }

  useEffect(() => {
    if (null === modalCharge) return;
    setNr(modalCharge.Nr);
    setName(modalCharge.name);
    setSurname(modalCharge.surname);
    setPC(modalCharge.PC);
    setDeposit(modalCharge.deposit);
    setSum('');

  }, [modalCharge]);

  const handleTransfer = () => {
    setChargeFunds({ id: modalCharge.id, sum });
    setModalCharge(null);
  }

  if (null === modalCharge) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Charge funds</h2>
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
                  <input type="text" className="form-control" value={name} readOnly />
                </div>
                <div className="form-group">
                  <label>Surname</label>
                  <input type="text" className="form-control" value={surname} readOnly />
                </div>
                <div className="form-group">
                  <label>Personal Code</label>
                  <input type="text" className="form-control" value={PC} readOnly />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" value={sum} onChange={e => setSum(e.target.value)} placeholder="EUR" />
                  <small className="form-text text-muted">Charge Balance: {deposit} Eur.</small>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-success" onClick={handleTransfer}>Transfer</button>
            <button type="button" className="btn btn-outline-secondary" onClick={close}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charge;