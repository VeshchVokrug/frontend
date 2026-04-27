import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CreateAdvertForm from './CreateAdvertForm'

const meta: Meta<typeof CreateAdvertForm> = {
  title: 'features/create-advert/CreateAdvertForm',
  component: CreateAdvertForm,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/profile/adverts/create',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CreateAdvertForm>

export const Default: Story = {}
