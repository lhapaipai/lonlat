import { Tooltip, SimpleTooltip } from "~design";
import { HTMLProps, forwardRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
};

const Box = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div
    ref={ref}
    className="storybook-box-xs"
    style={{
      margin: "100px",
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
        <SimpleTooltip color="yellow" open={true} placement="right-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="right" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip open={true} placement="right-end" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="yellow" open={true} placement="left-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="gray" open={true} placement="left" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="orange" open={true} placement="left-end" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="red" open={true} placement="top-start" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="blue" open={true} placement="top" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="green" open={true} placement="top-end" content="infos">
          <Box />
        </SimpleTooltip>
        <SimpleTooltip color="red" open={true} placement="bottom-start" content="infos">
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

export const Draggable = () => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ event, offset: [x, y] }) => {
    event.preventDefault();
    api.start({ x, y, immediate: true });
  });
  return (
    <div className="container">
      <SimpleTooltip content="infos" placement="top" open={true} color="yellow">
        <animated.div
          {...bind()}
          className="storybook-box-xs"
          style={{
            x,
            y,
            cursor: "pointer",
          }}
        >
          <span>Box</span>
        </animated.div>
      </SimpleTooltip>
    </div>
  );
};
