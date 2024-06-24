import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button";

import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalFooter,
} from ".";
import { type Tab, Tabs } from "../tabs/Tabs";

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

export const BasicLongText: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ children, ...args }) => {
    return (
      <Modal {...args}>
        <ModalTrigger>open Modal</ModalTrigger>
        <ModalContent className="w-[600px] max-w-full">
          <ModalHeader>Header</ModalHeader>
          <ModalDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem voluptates amet ad recusandae a. Laudantium, aliquam!
            Perferendis reiciendis aliquid ut repudiandae, repellat tenetur
            harum! Ad dicta nostrum laboriosam consectetur ratione.
          </ModalDescription>
        </ModalContent>
      </Modal>
    );
  },
  args: {
    initialOpen: false,
    color: "default",
  },
};

export const WithButtons = () => {
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
          <div className="flex justify-between">
            <Button
              variant="text"
              color="gray"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button color="yellow" onClick={() => setIsOpen(false)}>
              Accept
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const WithTabs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | number>("css");

  const tabs: Tab[] = [
    {
      id: "css",
      title: "CSS Export",
      content: (
        <div className="flex h-96 max-h-full flex-col p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odit
            id omnis molestias quidem necessitatibus aperiam deleniti, neque
            reiciendis iusto dolorem pariatur voluptatem natus reprehenderit
            itaque illum autem consectetur vero?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odit
            id omnis molestias quidem necessitatibus aperiam deleniti, neque
            reiciendis iusto dolorem pariatur voluptatem natus reprehenderit
            itaque illum autem consectetur vero?
          </p>
        </div>
      ),
    },
    {
      id: "json",
      title: "JSON Export",
      content: (
        <div className="flex h-96 max-h-full flex-col p-4">
          <p>
            Hello world Hello world Hello world Hello world Hello world Hello
            world Hello world Hello world Hello world Hello world Hello world
            Hello world Hello world Hello world Hello world Hello world Hello
            world Hello world Hello world Hello world Hello world Hello world
            Hello world{" "}
          </p>
        </div>
      ),
    },
  ];

  return (
    <Modal open={isOpen} onOpen={setIsOpen}>
      <ModalTrigger>Generate config</ModalTrigger>
      <ModalContent className="w-full max-w-[600px]">
        <Tabs tabs={tabs} value={id} onChange={setId} className="rounded-2xl">
          <Button
            icon
            variant="text"
            color="gray"
            onClick={() => setIsOpen(false)}
          >
            <i className="fe-cancel"></i>
          </Button>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

export const Scrollable = () => {
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium unde, blanditiis rem accusamus obcaecati enim amet,
              voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
              qui vero, blanditiis quos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium unde, blanditiis rem accusamus obcaecati enim amet,
              voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
              qui vero, blanditiis quos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium unde, blanditiis rem accusamus obcaecati enim amet,
              voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
              qui vero, blanditiis quos?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium unde, blanditiis rem accusamus obcaecati enim amet,
              voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
              qui vero, blanditiis quos?
            </p>
          </div>
        </ModalDescription>
        <ModalFooter>
          <div className="flex justify-between">
            <Button
              variant="text"
              color="gray"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button color="yellow" onClick={() => setIsOpen(false)}>
              Accept
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
