import { useContext, useState } from "react";
import DataContext from "./DataContext";
import rand from '../Functions/rand';

function Create() {

  const { setCreateAccount } = useContext(DataContext);

  const [Nr, setNr] = useState('LT' + rand(100000000000000000, 999999999999999999));
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [PC, setPC] = useState('');

  const handleCreate = () => {
    setCreateAccount({ name, surname, PC });
    setName('');
    setSurname('');
    setPC('');
  }

  return (
    <div className="col-5">
      <div className="card mt-4">
        <div className="card-header">
          <h3>Create New Account</h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Account Nr.</label>
            <input type="text" className="form-control" value={Nr} onChange={e => setNr(e.target.value)} />
            <small className="form-text text-muted">Please, enter your name</small>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
            <small className="form-text text-muted">Please, enter your name</small>
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input type="text" className="form-control" value={surname} onChange={e => setSurname(e.target.value)} />
            <small className="form-text text-muted">Please, enter your surname</small>
          </div>
          <div className="form-group">
            <label>Personal Code</label>
            <input type="text" className="form-control" value={PC} onChange={e => setPC(e.target.value)} />
            <small className="form-text text-muted">Please, enter your personal code</small>
          </div>
          <button type="button" className=" btn btn-outline-success" onClick={handleCreate} >Create</button>
        </div>
      </div>
    </div>
  );
}

export default Create;
