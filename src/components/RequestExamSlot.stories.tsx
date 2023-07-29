import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import Component from '../routes/RequestExamSlot';

type StoryArgs = ComponentProps<typeof Component>;
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
  component: Component,
  argTypes: { onSubmit: { action: 'form submitted' } },
} satisfies Meta<StoryArgs>;

export default meta;

export const RequestExamSlot: Story = {};