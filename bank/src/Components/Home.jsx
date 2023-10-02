import { useContext } from "react";
import DataContext from "./DataContext";

function Home() {

  const { userName } = useContext(DataContext);

  return (
    <>
      <h5>Hi, {userName}</h5>
      <div className="bank">
        <h1>Welcome to the Bank!</h1>
      </div>
    </>
  );
}

export default Home;