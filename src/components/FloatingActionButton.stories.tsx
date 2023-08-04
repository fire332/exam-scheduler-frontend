import type { Meta, StoryObj } from '@storybook/react';

import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import type { ComponentProps } from 'react';
import Component from './FloatingActionButton';

const iconMap = {
  PlusIcon,
  Pencil1Icon,
} as const;

interface ExtraStoryArgs {
  iconChoice: keyof typeof iconMap;
  label?: string;
  toggleLabel: boolean;
}
type StoryArgs = ComponentProps<typeof Component> & ExtraStoryArgs;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  args: {
    iconChoice: 'PlusIcon',
    label: 'Add Item',
    toggleLabel: true,
  },
  argTypes: {
    iconChoice: {
      control: 'inline-radio',
      options: Object.keys(iconMap),
    },
    label: {
      control: 'text',
    },
    onClick: {
      action: 'onClick',
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const IconOnly: Story = {
  render: (args: StoryArgs) => (
    <Component onClick={args.onClick} icon={iconMap[args.iconChoice]} />
  ),
};

export const LabelOnly: Story = {
  render: (args: StoryArgs) => (
    <Component onClick={args.onClick}>{args.label + '​'}</Component>
  ),
};
export const Extended: Story = {
  render: (args: StoryArgs) => {
    const icon = iconMap[args.iconChoice];
    return (
      <Component onClick={args.onClick} icon={icon}>
        {args.toggleLabel && args.label}
      </Component>
    );
  },
};
