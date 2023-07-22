import {
  Button,
  FetchError,
  Input,
  customFetch,
  withNotifierCustomFetch,
} from "@lonlat/shared/index";
import "./App.scss";
import { ChangeEvent, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  async function handleClick() {
    const response = await withNotifierCustomFetch("http://localhost:3000/posts");
    console.log(response);

    // try {
    // } catch (err) {
    //   if (err instanceof FetchError) {
    //     console.log("FetchError error :", err, err.name, err.message);
    //   } else {
    //     throw err;
    //   }
    // }
  }

  return (
    <div id="my-app">
      <Button className="ll-button" onClick={handleClick}>
        Fetch
      </Button>
      <Input value={search} onChange={handleChange} />
    </div>
  );
}

export default App;
