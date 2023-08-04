import type { ComponentProps } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Component from './MonthView';

type StoryArgs = ComponentProps<typeof Component>;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  decorators: [
    (Story) => (
      <div className="h-[460px] w-[420px] resize overflow-auto border border-error-200">
        <Story />
      </div>
    ),
  ],
  args: {
    year: 2023,
    month: 7,
    locale: 'en-CA',
  },
  argTypes: {
    locale: {
      control: 'inline-radio',
      options: ['en-CA', 'en-UK'],
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const MonthView: Story = {};
