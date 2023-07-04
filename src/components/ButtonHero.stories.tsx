import type { Meta, StoryObj } from '@storybook/react';
import ButtonComponent from './ButtonHero';

type Story = StoryObj<typeof ButtonComponent>;

const meta = {
  component: ButtonComponent,
  argTypes: { children: { control: 'text' } }
} satisfies Meta<typeof ButtonComponent>;

export default meta;

export const ButtonHero: Story = {
  render: (args) => <ButtonComponent {...args}>{args.children}</ButtonComponent>
};
