import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './PageHeader';
import RouterStoryDecorator from './RouterStoryDecorator';

type StoryArgs = ComponentProps<typeof Component>;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  args: {
    children: 'Sheet Title',
    to: undefined,
  },
  argTypes: {
    children: { type: 'string' },
    to: {
      control: 'inline-radio',
      options: [undefined, '/'],
    },
  },
  decorators: [
    RouterStoryDecorator,
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

export const TitleOnly: Story = {
  args: {
    to: undefined,
  },
};

export const WithBackButton: Story = {
  args: {
    to: '/',
  },
};
