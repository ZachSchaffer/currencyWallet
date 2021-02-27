import { useState } from "react";
import "./App.css";

function App() {

  const [currency, setCurrency] = useState(0); 

  const names = ['Zach', 'Hector', 'Spike'];

  function test() {
    // fetch("http://localhost:5000/")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    setCurrency(currency + 1);
  }

  return (
    <div className="App">
      <p>Currency value: {currency}</p>
      {names.map(e => <p>{e}</p>)}
      {[<p>1</p>, <p>2</p>]}
      <input></input>
      <button onClick={test}>Submit</button>
    </div>
  );
}

export default App;
