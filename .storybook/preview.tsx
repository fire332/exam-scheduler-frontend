import {
  AsyncBoundary,
  CacheProvider,
  DevToolsManager,
} from '@rest-hooks/react';
import { withThemeByClassName } from '@storybook/addon-styling';
import type { Decorator, Preview, ReactRenderer } from '@storybook/react';

import '../src/index.css';

type PartialStoryFn = Parameters<Decorator>[0];

const preview = {
  parameters: {
    layout: 'centered',
    chromatic: { pauseAnimationAtEnd: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    decorators: [
      (Story: PartialStoryFn) => (
        <CacheProvider
          managers={[
            ...CacheProvider.defaultProps.managers,
            new DevToolsManager(),
          ]}
        >
          <AsyncBoundary fallback="loading">
            <Story />
          </AsyncBoundary>
        </CacheProvider>
      ),
    ],
  },
} satisfies Preview;

export const decorators: Decorator[] = [
  withThemeByClassName<ReactRenderer>({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
