import { CalendarIcon, ClockIcon, TimerIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import AdditionalInfo from './AdditionalInfo';
import Component from './ExamListItem';

// TODO: clean up archaic JS Date useage

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  args: {
    heading: 'BUS 251',
    subheading: 'Steve Gibson'
  }
} satisfies Meta<typeof Component>;

export default meta;

export const ExamListItem: Story = {
  render: (args) => {
    const jsStartDate = new Date('August 12, 23 09:00:00');
    const startDate = DateTime.fromJSDate(new Date('August 12, 23 09:00:00'));
    const endDate = DateTime.fromJSDate(new Date('August 12, 23 11:50:00'));

    const diff = endDate.diff(startDate, ['hours', 'minutes']);

    return (
      <Component {...args}>
        <div>
          <AdditionalInfo Icon={CalendarIcon}>
            {jsStartDate.toLocaleString('default', {
              month: 'long',
              day: 'numeric'
            })}
            , {startDate.toFormat('y')}
          </AdditionalInfo>

          <AdditionalInfo Icon={ClockIcon}>
            {startDate.toFormat('h')}am
          </AdditionalInfo>

          <AdditionalInfo Icon={TimerIcon}>{diff.toHuman()}</AdditionalInfo>
        </div>
      </Component>
    );
  }
};
