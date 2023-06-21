import type { Meta, StoryObj } from '@storybook/react';
import ButtonComponent from './Button';

type Story = StoryObj<typeof ButtonComponent>;

const meta = {
  component: ButtonComponent
} satisfies Meta<typeof ButtonComponent>;

export default meta;

export const Button: Story = {
  render: (args) => <ButtonComponent {...args} />
};
