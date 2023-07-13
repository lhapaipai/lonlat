import { Input, Button } from "@lonlat/components";

export default {
  title: "Components/Input",
  component: Input,
};

export const Basic = () => (
  <div className="flex gap-2 flex-column">
    <Input />
    <Input placeholder="Your first name" />
    <Input prefix={<span>prefix</span>} />
    <Input suffix={<span>suffix</span>} />
    <div className="flex gap-2 ">
      <Input />
      <Button>Valider</Button>
    </div>
  </div>
);
