import type { Meta, StoryObj } from '@storybook/react';
import FICLogoBWComponent from './FICLogoBW';

type Story = StoryObj<typeof FICLogoBWComponent>;

const meta = {
  component: FICLogoBWComponent
} satisfies Meta<typeof FICLogoBWComponent>;

export default meta;

export const FICLogoBW: Story = {
  render: () => <FICLogoBWComponent width="300" height="auto" />
};
