import { useState } from "react";
import { Button, useIsClosing } from "..";
import clsx from "clsx";

export default {
  title: "Styles/Animation",
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen((v) => !v)}>
          {isOpen ? "Masquer" : "Afficher"}
        </Button>
      </div>
      {isOpen && (
        <div className="h-[300px] w-[300px] origin-top-left shadow-xl flex-center motion-safe:animate-fade-in">
          Modal
        </div>
      )}
    </div>
  );
};

export const InOut = () => {
  const { isOpen, isClosing, setIsOpen } = useIsClosing(false);
  const classNames = clsx([
    "shadow-xl w-[300px] h-[300px]",
    "origin-top-left",
    "flex-center",
    isClosing ? "motion-safe:animate-fade-out" : "motion-safe:animate-fade-in",
  ]);

  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Masquer" : "Afficher"}
        </Button>
      </div>
      {isOpen && <div className={classNames}>Modal</div>}
    </div>
  );
};
