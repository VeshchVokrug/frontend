import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import UploadInput from './UploadInput'

const meta: Meta<typeof UploadInput> = {
  title: 'shared/UploadInput',
  component: UploadInput,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof UploadInput>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Фото вещи',
  },
}

export const WithError: Story = {
  args: {
    label: 'Фото вещи',
    error: 'Максимальное количество фотографий - 5',
  },
}
