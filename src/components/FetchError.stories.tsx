import { NetworkError } from '@rest-hooks/rest';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './FetchError';

interface ExtraArgs {
  httpStatusCode: number;
  text: string;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraArgs;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const FetchError: Story = {
  args: {
    httpStatusCode: 401,
  },
  render: ({ httpStatusCode }) => {
    const error = new NetworkError(
      new Response(undefined, { status: httpStatusCode })
    );

    return <Component error={error} />;
  },
};
