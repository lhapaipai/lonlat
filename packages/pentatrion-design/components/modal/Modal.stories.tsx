import { Modal, ModalTrigger, ModalContent } from "@lonlat/shared";
import {
  ModalDescription,
  ModalHeader,
  ModalFooter,
} from "@lonlat/shared/components/modal/Components";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@lonlat/shared";
import { useState } from "react";

const meta = {
  title: "Components/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ children, ...args }) => {
    return (
      <Modal {...args}>
        <ModalTrigger>open Modal</ModalTrigger>
        <ModalContent>
          <ModalHeader>Header</ModalHeader>
          <ModalDescription>Content</ModalDescription>
        </ModalContent>
      </Modal>
    );
  },
  args: {
    initialOpen: false,
    color: "default",
  },
};

export const Context = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      open={isOpen}
      onOpen={(e) => {
        console.log("setIsOpen", e);
        setIsOpen(e);
      }}
    >
      <ModalTrigger>open Modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>Header</ModalHeader>
        <ModalDescription>Content</ModalDescription>
        <ModalFooter>
          <div className="actions">
            <Button shape="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => setIsOpen(false)}>
              Accept
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ScrollableModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      open={isOpen}
      onOpen={(e) => {
        console.log("setIsOpen", e);
        setIsOpen(e);
      }}
    >
      <ModalTrigger>open scrollable modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>Header</ModalHeader>
        <ModalDescription height={160}>
          <div className="px-4 text-justify">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
              rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
              Deleniti iure amet qui vero, blanditiis quos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
              rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
              Deleniti iure amet qui vero, blanditiis quos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
              rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
              Deleniti iure amet qui vero, blanditiis quos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis
              rem accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in?
              Deleniti iure amet qui vero, blanditiis quos?
            </p>
          </div>
        </ModalDescription>
        <ModalFooter>
          <div className="actions">
            <Button shape="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => setIsOpen(false)}>
              Accept
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
