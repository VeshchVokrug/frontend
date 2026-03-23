import type { Meta, StoryObj } from '@storybook/react'
import RegisterForm from './RegisterForm'

const meta: Meta<typeof RegisterForm> = {
  title: 'features/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {}
