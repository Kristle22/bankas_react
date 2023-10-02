import { useContext } from "react";
import DataContext from './DataContext';
import ListLine from './ListLine';

function List() {

  const { accounts, setDeleteAccount, setModalAdd, setModalCharge } = useContext(DataContext);

  return (
    <div className="col-7">
      <div className="card mt-4">
        <div className="card-header">
          <h2>All accounts</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {
              accounts.map(a =>
                <ListLine key={a.id} account={a} setDelete={setDeleteAccount} setModalAdd={setModalAdd} setModalCharge={setModalCharge} />
              )}
          </ul>
        </div>
      </div>
    </div >
  );
}

export default List;