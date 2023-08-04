import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Component from './OrderedDateInput';

type StoryArgs = ComponentProps<typeof Component>;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: { isoDates: ['2023-08-04', '2023-08-05', undefined] },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
  render: () => <Component inputName="isoDates" labelText="Dates" />,
} satisfies Meta<StoryArgs>;

export default meta;

export const OrderedDateInput: Story = {};
