import {
  CalendarIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  InputIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { ScheduledExam } from 'api/ScheduledExam';
import type { ComponentProps } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Component from './ComboChipInput';

const iconMap = {
  CalendarIcon,
  InputIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  DefaultIcon: undefined,
} as const;

interface ExtraProps {
  defaultValue: string;
  errorMessage: string;
  leftIcon: keyof typeof iconMap;
  rightIcon: keyof typeof iconMap;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraProps;
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
  component: Component,
  decorators: [
    (Story) => {
      const methods = useForm<{ field: ScheduledExam['locations'] }>({
        defaultValues: {
          field: [{ roomName: 'BIS1 2020' }],
        },
        mode: 'all',
      });

      return (
        <FormProvider {...methods}>
          <form className="flex h-60 w-[360px] resize-x flex-col items-stretch justify-center bg-white p-4">
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  args: {
    defaultValue: 'John Doe',
    labelText: 'Rooms',
    helperText: 'Some helper Text',
    errorMessage: 'Max 2 character limit.',
    leftIcon: 'DefaultIcon',
    rightIcon: 'DefaultIcon',
  },
  argTypes: {
    leftIcon: {
      control: 'radio',
      options: ['DefaultIcon', 'InputIcon', 'MagnifyingGlassIcon'],
    },
    rightIcon: {
      control: 'radio',
      options: ['DefaultIcon', 'InfoCircledIcon', 'ExclamationTriangleIcon'],
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const Normal: Story = {
  render: (args) => {
    const leftIcon = iconMap[args.leftIcon];
    return <Component {...args} inputName={'field'} labelIcon={leftIcon} />;
  },
};

export const Error: Story = {
  render: (args) => {
    const leftIcon = iconMap[args.leftIcon];
    return (
      <Component
        {...args}
        inputName={'field'}
        labelIcon={leftIcon}
        validateOpts={{
          required: true,
          maxLength: { value: 2, message: args.errorMessage },
        }}
      />
    );
  },
};
