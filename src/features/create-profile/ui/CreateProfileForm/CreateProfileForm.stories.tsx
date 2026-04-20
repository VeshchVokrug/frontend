import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CreateProfileForm from './CreateProfileForm'

const meta: Meta<typeof CreateProfileForm> = {
  title: 'features/CreateProfileForm',
  component: CreateProfileForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CreateProfileForm>

export const Default: Story = {}
