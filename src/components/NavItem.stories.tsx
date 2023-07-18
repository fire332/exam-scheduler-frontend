import {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './NavItem';

const iconMap = {
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
  DefaultIcon: undefined,
} as const;

interface ExtraStoryArgs {
  iconChoice: keyof typeof iconMap;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraStoryArgs;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  decorators: [
    (Story) => (
      <div className="flex h-60 w-[360px] flex-col items-center justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    active: true,
    shortText: 'Short Label',
    longText: 'Long Label',
    iconChoice: 'DefaultIcon',
  },
  argTypes: {
    iconChoice: {
      control: 'radio',
      options: Object.keys(iconMap),
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const Single: Story = {
  render: (args) => {
    const icon = iconMap[args.iconChoice];
    return <Component {...args} icon={icon} />;
  },
};

export const Triple: Story = {
  render: (args) => {
    return (
      <>
        {Object.entries(iconMap).map(([iconName, icon]) => (
          <Component
            {...args}
            icon={icon}
            active={args.iconChoice === iconName}
            key={iconName}
          />
        ))}
      </>
    );
  },
};
