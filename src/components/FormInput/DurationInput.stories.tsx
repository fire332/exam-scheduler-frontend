import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Component from './DurationInput';

interface ExtraProps {
  defaultValue: string;
  errorMessage: string;
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
          <form className="flex h-60 w-[360px] items-center justify-center bg-white">
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
