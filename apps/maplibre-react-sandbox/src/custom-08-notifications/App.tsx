import "./App.scss";
import { useState } from "react";
import { customFetch } from "pentatrion-design";
import { useAppDispatch } from "./store";
import { basicAsyncError, fetchAsyncError } from "./store/counterSlice";
import { useNotification } from "pentatrion-design/redux";

function App() {
  const [counter, setCounter] = useState(0);
  const { notifyError, notify } = useNotification();
  const dispatch = useAppDispatch();

  function handleClickAddNotification() {
    notify(`message ${counter}`);
  }

  function handleThrowError() {
    try {
      throw new Error("Some App Error");
    } catch (err: unknown) {
      notifyError(err);
    }
  }

  async function handleRunFetchError() {
    try {
      await customFetch("http://unknown/hello");
    } catch (err: unknown) {
      notifyError(err);
    }
  }

  async function handleThrowBasicAsyncReduxError() {
    dispatch(basicAsyncError());
  }

  async function handleThrowFetchAsyncReduxError() {
    dispatch(fetchAsyncError(3));
  }

  return (
    <>
      <div className="sidebar">
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
        </div>
        <div>
          <button onClick={handleClickAddNotification}>add notification</button>
        </div>
        <div>
          <button onClick={handleThrowError}>throw error</button>
        </div>
        <div>
          <button onClick={handleRunFetchError}>run fetch error</button>
        </div>
        <div>
          <button onClick={handleThrowBasicAsyncReduxError}>throw redux async error</button>
        </div>
        <div>
          <button onClick={handleThrowFetchAsyncReduxError}>throw redux fetch async error</button>
        </div>
      </div>
    </>
  );
}

export default App;
