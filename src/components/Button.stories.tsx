import type { Meta, StoryObj } from '@storybook/react';
import Component from './Button';
import { ButtonIntent } from './constants';

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  args: {
    children: 'Click me',
  },
  argTypes: {
    intent: { control: 'inline-radio', options: ['solid', 'outline', 'tonal'] },
    children: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} satisfies Meta<typeof Component>;

export default meta;

export const Solid: Story = {
  args: {
    intent: ButtonIntent.Solid,
  },
};

export const Outline: Story = {
  args: {
    intent: ButtonIntent.Outline,
  },
};

export const Tonal: Story = {
  args: {
    intent: ButtonIntent.Tonal,
  },
};
