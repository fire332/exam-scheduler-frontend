import type { Meta, StoryObj } from '@storybook/react';
import Component from './Drawer';
import NavItem from './NavItem';

type StoryArgs = typeof Component;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  argTypes: { children: { control: 'text' } },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="flex h-full">
        <Story />
        <div className="grow bg-white" />
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

export const Drawer: Story = {
  render: (args) => (
    <Component {...args}>
      <NavItem
        expanded={args.expanded}
        active
        shortText="Schedule"
        longText="Schedule"
      />
      <NavItem
        expanded={args.expanded}
        shortText="Request"
        longText="Request"
      />
      <NavItem
        expanded={args.expanded}
        shortText="Proctoring"
        longText="Proctoring"
      />
    </Component>
  ),
};
