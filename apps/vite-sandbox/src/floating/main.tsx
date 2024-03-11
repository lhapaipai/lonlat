import { arrow, computePosition, flip, offset, shift } from "@floating-ui/react";
import "./App.scss";

import "@lonlat/shared/styles/_storybook.scss";
import "@lonlat/shared/components/dialog/Dialog.scss";

const button = document.querySelector<HTMLButtonElement>("#button")!;
const tooltip = document.querySelector<HTMLDivElement>("#tooltip")!;
const arrowElements = Array.from(document.querySelectorAll<HTMLDivElement>(".arrow"));

function update() {
  computePosition(button, tooltip, {
    placement: "top",
    middleware: [
      offset(6),
      flip(),
      shift({
        padding: 6,
      }),
      arrow({ padding: 4, element: arrowElements[0] }),
    ],
  }).then(({ x, y, placement, middlewareData, strategy }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    console.log(placement, strategy);

    arrowElements.forEach((arrowElement) => {
      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    });
  });
}

const initialPos = { x: 0, y: 0 };
const buttonPos = { x: 0, y: 0 };
function handleMouseDown(e: MouseEvent) {
  const targetBox = e.target!.getBoundingClientRect();
  initialPos.x = e.clientX;
  initialPos.y = e.clientY;

  buttonPos.x = targetBox.left;
  buttonPos.y = targetBox.top;

  document.body.addEventListener("mousemove", handleMouseMove);
  document.body.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(e: MouseEvent) {
  const dx = e.clientX - initialPos.x;
  const dy = e.clientY - initialPos.y;

  button.style.left = `${buttonPos.x + dx}px`;
  button.style.top = `${buttonPos.y + dy}px`;

  update();
}
function handleMouseUp(e) {
  console.log("handleMouseUp");
  document.body.removeEventListener("mousemove", handleMouseMove);
  document.body.removeEventListener("mouseup", handleMouseUp);
}

button.addEventListener("mousedown", handleMouseDown);

update();
