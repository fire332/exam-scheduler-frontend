import { CalendarIcon, ClockIcon, TimerIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import AdditionalInfo from './AdditionalInfo';
import Component from './RichListItem';

// TODO: currently still based upon ExamListItem, refactor to improve this

type StoryArgs = typeof Component;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  args: {
    heading: 'BUS 251',
    subheading: 'Steve Gibson',
  },
} satisfies Meta<StoryArgs>;

export default meta;

export const RichListItem: Story = {
  render: (args) => {
    // https://moment.github.io/luxon/#/parsing?id=table-of-tokens
    const startDate = DateTime.fromFormat('Aug 12, 2023, 9:00 AM', 'ff');
    const endDate = DateTime.fromFormat('Aug 12, 2023, 11:50 AM', 'ff');

    const diff = endDate.diff(startDate, ['hours', 'minutes']);

    return (
      <Component {...args}>
        <div>
          <AdditionalInfo Icon={CalendarIcon}>
            {startDate.toLocaleString({
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </AdditionalInfo>

          <AdditionalInfo Icon={ClockIcon}>
            {startDate.toLocaleString({ hour: 'numeric' })}
          </AdditionalInfo>

          <AdditionalInfo Icon={TimerIcon}>{diff.toHuman()}</AdditionalInfo>
        </div>
      </Component>
    );
  },
};
