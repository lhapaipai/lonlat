import { createRoot } from "react-dom/client";
import "./main.scss";
import App from "./App";
import "pentatrion-design/styles/_storybook.scss";
import "pentatrion-design/components/dialog/Dialog.scss";

createRoot(document.getElementById("app")!).render(<App />);

// import * as floatingUIutils from "@floating-ui/utils/dom";
