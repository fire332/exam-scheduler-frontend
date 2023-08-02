import { NetworkError } from '@rest-hooks/rest';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './FetchError';

const netError = new NetworkError(new Response(undefined, { status: 500 }));

interface ExtraArgs {
  text: string;
  errorChoice?: 'Error 500';
}

type StoryArgs = ComponentProps<typeof Component> & ExtraArgs;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  argTypes: {
    httpStatus: {
      control: 'inline-radio',
      options: [undefined, 401, 500],
    },
    errorChoice: {
      control: 'inline-radio',
      options: [undefined, 'Error 500'],
    },
  },
  render: ({ errorChoice, httpStatus, text }: StoryArgs) => {
    if (errorChoice) return <Component error={netError}>{text}</Component>;
    else return <Component httpStatus={httpStatus}>{text}</Component>;
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const NoStatusCode: Story = {};

export const WithStatusCode: Story = {
  args: {
    httpStatus: 401,
    errorChoice: undefined,
  },
};

export const WithNetworkError: Story = {
  args: {
    httpStatus: undefined,
    errorChoice: 'Error 500',
  },
};
