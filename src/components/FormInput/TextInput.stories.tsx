import {
  CalendarIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  InputIcon,
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, type ComponentProps } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import Component from './FormTextInput';

const iconMap = {
  CalendarIcon,
  InputIcon,
  InfoCircledIcon,
  ExclamationTriangleIcon,
  DefaultIcon: undefined,
} as const;

interface ExtraProps {
  leftIcon: keyof typeof iconMap;
  rightIcon: keyof typeof iconMap;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraProps;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          test: 'input text value',
        },
      });

      return (
        <FormProvider {...methods}>
          <form className="flex h-60 w-[360px] items-center justify-center bg-white">
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  args: {
    labelText: 'Label Text',
    helperText: 'Helper Text',
    leftIcon: 'DefaultIcon',
    rightIcon: 'DefaultIcon',
  },
  argTypes: {
    leftIcon: {
      control: 'radio',
      options: {
        DefaultIcon: 'DefaultIcon',
        InputIcon: 'InputIcon',
        InfoCircledIcon: 'InfoCircledIcon',
      },
    },
    rightIcon: {
      control: 'radio',
      options: {
        DefaultIcon: 'DefaultIcon',
        InfoCircledIcon: 'InfoCircledIcon',
        ExclamationTriangleIcon: 'ExclamationTriangleIcon',
      },
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const Normal: Story = {
  render: (args) => {
    // const leftIcon = iconMap[args.leftIcon];
    // const rightIcon = iconMap[args.rightIcon];
    return <Component {...args} inputName="test" />;
  },
};

export const Error: Story = {
  decorators: [
    (Story) => {
      const { setError } = useFormContext();
      useEffect(() => {
        setError('test', { type: 'custom', message: 'error message' });
      }, [setError]);

      return <Story />;
    },
  ],
  render: (args) => {
    return <Component {...args} />;
  },
};
