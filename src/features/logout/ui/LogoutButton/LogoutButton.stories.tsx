import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import LogoutButton from './LogoutButton'

const meta: Meta<typeof LogoutButton> = {
  title: 'features/LogoutButton',
  component: LogoutButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LogoutButton>

export const Default: Story = {}
