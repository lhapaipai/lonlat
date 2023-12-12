import Tooltip from "./tooltip/Tooltip";
import TooltipContent from "./tooltip/TooltipContent";
import TooltipTrigger from "./tooltip/TooltipTrigger";

export default function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Tooltip type="primary">
        <TooltipTrigger>Click me !</TooltipTrigger>
        <TooltipContent>Mon contenu !!</TooltipContent>
      </Tooltip>
    </div>
  );
}
