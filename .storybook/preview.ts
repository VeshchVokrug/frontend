import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { QueryProvider } from '../src/app/providers/query-provider'
import '../src/shared/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story) =>
      React.createElement(QueryProvider, {
        children: React.createElement(Story, {}),
      }),
  ],
}

export default preview
