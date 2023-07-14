import {
  AsyncBoundary,
  CacheProvider,
  DevToolsManager,
} from '@rest-hooks/react';
import { withThemeByClassName } from '@storybook/addon-styling';
import type { Preview } from '@storybook/react';

import '../src/index.css';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type Decorator = ArrayElement<Exclude<Preview['decorators'], undefined>>;
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
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
