import {
  CalendarIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  InputIcon
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './FormTextInput';

const iconMap = {
  CalendarIcon,
  InputIcon,
  InfoCircledIcon,
  ExclamationTriangleIcon,
  DefaultIcon: undefined
} as const;

interface ExtraProps {
  leftIcon: keyof typeof iconMap;
  rightIcon: keyof typeof iconMap;
}

type Story = StoryObj<ComponentProps<typeof Component> & ExtraProps>;

const meta = {
  component: Component,
  decorators: [
    (Story) => {
      return (
        <div className="flex h-60 w-[360px] items-center justify-center">
          <Story />
        </div>
      );
    }
  ],
  args: {
    inputId: 'id',
    labelText: 'Label Text',
    leftIcon: 'DefaultIcon',
    rightIcon: 'DefaultIcon'
  },
  argTypes: {
    leftIcon: {
      control: 'radio',
      options: {
        DefaultIcon: 'DefaultIcon',
        InputIcon: 'InputIcon',
        InfoCircledIcon: 'InfoCircledIcon'
      }
    },
    rightIcon: {
      control: 'radio',
      options: {
        DefaultIcon: 'DefaultIcon',
        InfoCircledIcon: 'InfoCircledIcon',
        ExclamationTriangleIcon: 'ExclamationTriangleIcon'
      }
    }
  }
} satisfies Meta<ComponentProps<typeof Component> & ExtraProps>;

export default meta;

export const FormTextInput: Story = {
  render: (args) => {
    const leftIcon = iconMap[args.leftIcon];
    const rightIcon = iconMap[args.rightIcon];
    return <Component {...args} LeftIcon={leftIcon} RightIcon={rightIcon} />;
  }
};
