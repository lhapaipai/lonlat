import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@lonlat/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {

  },
  // tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    children: 'Button',
  },
};

export const Test = () => (
  <Button>Coucou</Button>
)

export const Secondary: Story = {
  args: {
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
};
