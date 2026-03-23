import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email',
    value: '',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Введите email',
    value: 'wrong',
    error: 'Некорректный email',
  },
}
