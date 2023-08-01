import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './OrderedDateInputItem';

interface ExtraArgs {
  year: number;
  month: number;
  day: number;
  provideValue: boolean;
  locale: string;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraArgs;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  args: {
    year: 2023,
    month: 7,
    day: 7,
    provideValue: true,
  },
  render: ({ year, month, day, provideValue }) => (
    <Component value={provideValue ? { year, month, day } : undefined} />
  ),
} satisfies Meta<StoryArgs>;

export default meta;

export const OrderedDateInputItem: Story = {};
