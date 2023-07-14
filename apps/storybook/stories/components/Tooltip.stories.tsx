import { Tooltip, SimpleTooltip } from "@lonlat/components";
import { HTMLProps, forwardRef } from "react";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
};

const Box = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div
    ref={ref}
    style={{
      margin: "100px",
      width: "100px",
      height: "100px",
      boxShadow: "var(--shadow-lg)",
      backgroundColor: "var(--background-strong)",
    }}
    {...props}
  ></div>
));

export const Basic = () => {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio neque dolorum soluta
        suscipit,&nbsp;
        <SimpleTooltip content="infos" placement="bottom">
          dessous
        </SimpleTooltip>
        &nbsp;aut unde provident? Optio ipsum provident unde! Nulla, dignissimos recusandae. Eveniet
        ut quam voluptatum accusantium aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur sit amet consectetur sit amet consectetur sit amet
        consectetur sit amet consectetursit amet consectetur adipisicing elit. Distinctio neque
        dolorum soluta suscipit,&nbsp;
        <SimpleTooltip content="infos" placement="top">
          top
        </SimpleTooltip>
        &nbsp; aut unde provident? Optio ipsum provident unde! Nulla, dignissimos recusandae.
        Eveniet ut quam voluptatum accusantium aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio neque dolorum soluta
        suscipit, sit amet consectetur&nbsp;
        <SimpleTooltip content="infos" placement="left">
          gauche
        </SimpleTooltip>
        &nbsp; aut unde provident? Optio ipsum provident unde! Nulla, dignissimos recusandae.
        Eveniet ut quam voluptatum accusantium aspernatur?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur sit amet consectetur sit amet consectetur adipisicing
        elit. Distinctio neque dolorum soluta suscipit, &nbsp;
        <SimpleTooltip content="infos" placement="right">
          droite
        </SimpleTooltip>
        &nbsp; aut unde provident? Optio ipsum provident unde! Nulla, dignissimos recusandae.
        Eveniet ut quam voluptatum accusantium aspernatur?
      </p>

      <div className="storybook-grid-cols">
        <SimpleTooltip open={true} placement="right-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="right" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="right-end" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip type="primary" open={true} placement="left-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip type="weak" open={true} placement="left" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip type="warning" open={true} placement="left-end" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip type="danger" open={true} placement="top-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip type="info" open={true} placement="top" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip type="success" open={true} placement="top-end" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="bottom-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="bottom" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="bottom-end" content="infos">
          <Box />
        </SimpleTooltip>
      </div>
    </div>
  );
};
