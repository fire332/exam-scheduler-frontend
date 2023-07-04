import type { Meta, StoryObj } from '@storybook/react';
import DrawerComponent from './Drawer';
import NavItem from './NavItem';

type Story = StoryObj<typeof DrawerComponent>;

const meta = {
  component: DrawerComponent,
  argTypes: { children: { control: 'text' } },
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof DrawerComponent>;

export default meta;

export const Drawer: Story = {
  render: (args) => <DrawerComponent {...args}>
    <NavItem active shortText={'Schedule'} longText={''} />
    <NavItem shortText={'Request'} longText={''} />
    <NavItem shortText={'Proctoring'} longText={''} />
    </DrawerComponent>
};
