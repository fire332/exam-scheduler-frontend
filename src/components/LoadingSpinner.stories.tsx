import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';
import Component from './LoadingSpinner';

type StoryArgs = ComponentProps<typeof Component>;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
} satisfies Meta<StoryArgs>;

export default meta;

export const LoadingSpinner: Story = {};
