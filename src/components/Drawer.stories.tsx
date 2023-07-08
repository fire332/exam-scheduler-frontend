import type { Meta, StoryObj } from '@storybook/react';
import DrawerComponent from './Drawer';
import NavItem from './NavItem';

type Story = StoryObj<typeof DrawerComponent>;

const meta = {
  component: DrawerComponent,
  argTypes: { children: { control: 'text' } },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="flex h-full">
        <Story />
        <div className="grow bg-white"></div>
      </div>
    )
  ]
} satisfies Meta<typeof DrawerComponent>;

export default meta;

export const Drawer: Story = {
  render: (args) => (
    <DrawerComponent {...args}>
      <NavItem
        expanded={args.expanded}
        active
        shortText={'Schedule'}
        longText={'Schedule'}
      />
      <NavItem
        expanded={args.expanded}
        shortText={'Request'}
        longText={'Request'}
      />
      <NavItem
        expanded={args.expanded}
        shortText={'Proctoring'}
        longText={'Proctoring'}
      />
    </DrawerComponent>
  )
};
