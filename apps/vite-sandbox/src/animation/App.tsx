import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import cn from "classnames";
import { Button } from "@lonlat/shared/index";
import "./app.scss";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Masquer" : "Afficher"}</button>
      </div>
      {isOpen && (
        <div>
          <Child1 />
          {/* <Child1>
            <Child2 />
          </Child1> */}
        </div>
      )}
    </div>
  );
}
