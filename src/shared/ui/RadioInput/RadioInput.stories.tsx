import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import RadioInput from './RadioInput'

const meta: Meta<typeof RadioInput> = {
  title: 'shared/RadioInput',
  component: RadioInput,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RadioInput>

export const Default: Story = {
  args: {
    label: 'Неважно',
    name: 'date',
    value: 'any',
  },
}
