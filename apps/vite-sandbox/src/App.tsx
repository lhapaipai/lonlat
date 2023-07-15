import { Badge, Tooltip, TooltipContent, TooltipTrigger, SimpleTooltip } from "@lonlat/components";
import "./App.scss";
function App() {
  return (
    <div id="my-app">
      <SimpleTooltip content="infos" placement="bottom">
        dessous
      </SimpleTooltip>
      <div style={{ width: "200px", height: "200px" }}></div>
      <SimpleTooltip content="infos" placement="top">
        dessus
      </SimpleTooltip>
      <div style={{ width: "200px", height: "200px" }}></div>
      <SimpleTooltip content="infos" placement="left">
        gauche
      </SimpleTooltip>
      <div style={{ width: "200px", height: "200px" }}></div>
      <SimpleTooltip content="infos" placement="right">
        droite
      </SimpleTooltip>
      {/* <Tooltip open={true} placement="right">
        <TooltipContent>infos</TooltipContent>
        <TooltipTrigger asChild={true}>bonjour tout le monde</TooltipTrigger>
      </Tooltip> */}
    </div>
  );
}

export default App;
