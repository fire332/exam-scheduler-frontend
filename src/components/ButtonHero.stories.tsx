import type { Meta, StoryObj } from '@storybook/react';
import Component from './ButtonHero';

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  args: {
    children: 'CLICK ME',
  },
  argTypes: { children: { control: 'text' } },
} satisfies Meta<typeof Component>;

export default meta;

export const ButtonHero: Story = {};
