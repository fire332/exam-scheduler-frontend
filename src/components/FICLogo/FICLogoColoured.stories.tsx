import type { Meta, StoryObj } from '@storybook/react';
import FICLogoColouredComponent from './FICLogoColoured';

type Story = StoryObj<typeof FICLogoColouredComponent>;

const meta = {
  component: FICLogoColouredComponent
} satisfies Meta<typeof FICLogoColouredComponent>;

export default meta;

export const FICLogoColoured: Story = {
  render: () => <FICLogoColouredComponent width="400" height="auto" />
};
