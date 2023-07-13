import { Loader } from "@lonlat/components";

export default {
  title: "Components/Loader",
  component: Loader,
};

export const Basic = () => (
  <div className="flex gap-2 flex-column">
    <Loader size="small" />
    <br />
    <Loader size="medium" type="primary" />
    <br />
    <Loader size="large" type="danger" />
  </div>
);
