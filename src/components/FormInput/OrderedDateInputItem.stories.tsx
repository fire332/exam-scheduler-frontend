import type { Meta, StoryObj } from '@storybook/react';
import { Reorder } from 'framer-motion';
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
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    year: 2023,
    month: 7,
    day: 7,
    provideValue: true,
  },
  argTypes: {
    dragHandlePointerDown: { action: 'dragHandleDown' },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-full w-fit min-w-fit resize-x flex-col justify-center overflow-x-auto border-x border-error-500 px-8">
        <Story />
      </div>
    ),
  ],
  render: ({ year, month, day, provideValue }) => {
    const value = provideValue ? { year, month, day } : undefined;

    return (
      // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-empty-function
      <Reorder.Group values={[value]} onReorder={() => {}}>
        <Component value={value} />
      </Reorder.Group>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const OrderedDateInputItem: Story = {};
