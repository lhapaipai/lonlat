import { Badge, Tooltip, TooltipContent, TooltipTrigger } from "@lonlat/components";

function App() {
  return (
    <div id="my-app">
      <div>
        <Badge>Badge</Badge>
        <Badge type="primary">Primary</Badge>
        <Badge type="warning">Warning</Badge>
        <Badge type="warning" tooltip="attention mon amis">
          Warning with tooltip
        </Badge>
        <Badge type="success">Success</Badge>
        <Badge type="danger">Danger</Badge>
        <Badge type="info">Info</Badge>
        <Badge type="weak">Weak</Badge>
      </div>
      <Tooltip open={true} placement="top">
        <TooltipContent>infos</TooltipContent>
        <TooltipTrigger asChild={true}>bonjour tout le monde</TooltipTrigger>
      </Tooltip>
      <Tooltip open={true} placement="bottom">
        <TooltipContent>infos</TooltipContent>
        <TooltipTrigger asChild={true}>bonjour tout le monde</TooltipTrigger>
      </Tooltip>
      <Tooltip open={true} placement="left">
        <TooltipContent>infos</TooltipContent>
        <TooltipTrigger asChild={true}>bonjour tout le monde</TooltipTrigger>
      </Tooltip>
      <Tooltip open={true} placement="right">
        <TooltipContent>infos</TooltipContent>
        <TooltipTrigger asChild={true}>bonjour tout le monde</TooltipTrigger>
      </Tooltip>
    </div>
  );
}

export default App;
