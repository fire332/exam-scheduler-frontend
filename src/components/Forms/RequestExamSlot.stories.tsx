import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import RouterStoryDecorator from '../RouterStoryDecorator';
import Component from './RequestExamSlot';

type StoryArgs = ComponentProps<typeof Component>;
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
  component: Component,
  decorators: [RouterStoryDecorator],
  argTypes: { onSubmit: { action: 'form submitted' } },
} satisfies Meta<StoryArgs>;

export default meta;

export const RequestExamSlot: Story = {};
