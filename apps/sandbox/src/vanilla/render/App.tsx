import { ReactNode, useState } from "react";

function Child() {
  console.log("render child");
  return <div>child</div>;
}
interface WrapperProps {
  children: ReactNode;
}

const wrapperStyle = {
  border: "1px solid green",
};
function Wrapper({ children }: WrapperProps) {
  const [counter, setCounter] = useState(0);

  console.log("render wrapper");
  return (
    <main style={wrapperStyle}>
      <button onClick={() => setCounter((c) => c + 1)}>Wrapper counter {counter}</button>
      <div>{children}</div>
    </main>
  );
}

const appStyle = {
  border: "1px solid black",
};
export default function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div style={appStyle}>
      <button onClick={() => setCounter((c) => c + 1)}>App counter {counter}</button>
      <Wrapper>
        <div>hello</div>
        <Child />
      </Wrapper>
    </div>
  );
}
