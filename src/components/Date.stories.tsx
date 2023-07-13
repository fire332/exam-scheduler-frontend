import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import Component from './Date';

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component
} satisfies Meta<typeof Component>;

export default meta;

export const Date: Story = {
  render: () => (
    <Component
      luxonDate={DateTime.fromObject({ year: 2023, month: 7, day: 1 })}
    />
  )
};
