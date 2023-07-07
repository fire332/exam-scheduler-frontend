import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeClosedIcon
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './NavItem';

const iconMap = {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeClosedIcon,
  DefaultIcon: undefined
} as const;

interface ExtraStoryArgs {
  iconChoise: keyof typeof iconMap;
}

type Story = StoryObj<ComponentProps<typeof Component> & ExtraStoryArgs>;

const meta = {
  component: Component,
  decorators: [
    (Story) => (
      <div className="flex h-60 w-[360px] items-center justify-center">
        <Story />
      </div>
    )
  ],
  args: {
    active: true,
    shortText: 'Short Label',
    longText: 'Long Label',
    iconChoise: 'DefaultIcon'
  },
  argTypes: {
    iconChoise: {
      control: 'radio',
      options: {
        DefaultIcon: 'DefaultIcon',
        CalendarIcon: 'CalendarIcon',
        EnvelopeClosedIcon: 'EnvelopeClosedIcon',
        EyeClosedIcon: 'EyeClosedIcon'
      }
    }
  }
} satisfies Meta<ComponentProps<typeof Component> & ExtraStoryArgs>;

export default meta;

export const NavItem: Story = {
  render: (args) => {
    const icon = iconMap[args.iconChoise];
    return <Component {...args} icon={icon} />;
  }
};
