// TODO remove un-needed

import {
  CalendarIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  InputIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Component from './TimeInput';

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

interface FormFields {
  field: string;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraProps;
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
  component: Component,
  decorators: [
    (Story, { args }) => {
      const methods = useForm<FormFields>({
        defaultValues: {
          field: args.defaultValue,
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
    labelText: 'Name',
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
    return <Component<FormFields> {...args} inputName={'field'} />;
  },
};

export const Error: Story = {
  render: (args) => {
    return (
      <Component<FormFields>
        {...args}
        inputName={'field'}
        validateOpts={{
          required: true,
        }}
      />
    );
  },
};