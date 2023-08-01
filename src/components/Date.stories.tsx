import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import Component from './Date';

interface ExtraArgs {
  year: number;
  month: number;
  day: number;
  provideValue: boolean;
  locale: string;
}

type StoryArgs = ComponentProps<typeof Component> & ExtraArgs;
type Story = StoryObj<StoryArgs>;

const meta = {
  component: Component,
  args: {
    showIcon: false,
    year: 2023,
    month: 7,
    day: 7,
    locale: 'en-CA',
    provideValue: true,
  },
  argTypes: {
    locale: {
      control: 'inline-radio',
      options: ['en-CA', 'en-US', 'uk-UA', 'ja-JP', 'ar-SA'],
    },
  },
  render: ({ year, month, day, locale, showIcon, provideValue }) => (
    <Component
      showIcon={showIcon}
      value={provideValue ? { year, month, day } : undefined}
      locale={locale}
    />
  ),
} satisfies Meta<StoryArgs>;

export default meta;

export const CanadianNoCalendar: Story = {};

export const CanadianWithCalendar: Story = {
  args: {
    showIcon: true,
  },
};

export const US: Story = {
  args: { locale: 'en-US' },
};

export const Ukraine: Story = { args: { locale: 'uk-UA' } };

export const Japan: Story = { args: { locale: 'ja-JP' } };

export const SaudiArabia: Story = { args: { locale: 'ar-SA' } };

export const NoValue: Story = {
  args: { showIcon: true, provideValue: false },
};
