import {
  CalendarIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  InputIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent } from '@storybook/testing-library';
import type { ComponentProps } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Component from './TextInput';

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
    const leftIcon = iconMap[args.leftIcon];
    return (
      <Component<FormFields>
        {...args}
        inputName={'field'}
        labelIcon={leftIcon}
      />
    );
  },
};

export const Error: Story = {
  render: (args) => {
    const leftIcon = iconMap[args.leftIcon];
    return (
      <Component<FormFields>
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
  play: async ({ canvasElement, step }) => {
    await step('select input', async () => {
      const input = canvasElement.getElementsByTagName('input')[0];
      expect(input).toBeInstanceOf(HTMLInputElement);

      await userEvent.click(input!);
    });
  },
};
