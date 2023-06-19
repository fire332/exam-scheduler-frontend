import {
  AsyncBoundary,
  CacheProvider,
  DevToolsManager
} from '@rest-hooks/react';
import { withThemeByClassName } from '@storybook/addon-styling';
import type { Preview, StoryFn } from '@storybook/react';
import { type DecoratorFunction } from '@storybook/types';

import '../src/index.css';

const preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    decorators: [
      (Story: StoryFn) => (
        <CacheProvider
          managers={[
            ...CacheProvider.defaultProps.managers,
            new DevToolsManager()
          ]}
        >
          <AsyncBoundary fallback="loading">
            <Story />
          </AsyncBoundary>
        </CacheProvider>
      )
    ]
  }
} satisfies Preview;

export const decorators = [
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark'
    },
    defaultTheme: 'light'
  })
] satisfies DecoratorFunction[];

export default preview;
