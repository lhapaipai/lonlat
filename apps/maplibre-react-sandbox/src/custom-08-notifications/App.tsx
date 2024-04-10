import "./App.scss";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div className="sidebar">
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
        </div>
      </div>
    </>
  );
}

export default App;
