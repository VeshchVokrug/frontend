import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within } from 'storybook/test'
import Select from './Select'

const SAMPLE_OPTIONS = [
  { value: 'electronics', text: 'Электроника' },
  { value: 'clothing', text: 'Одежда' },
  { value: 'furniture', text: 'Мебель' },
  { value: 'sport', text: 'Спорт' },
]

const meta: Meta<typeof Select> = {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    name: 'category',
    label: 'Категория вещи',
    placeholder: 'Выберите категорию вещи',
    value: '',
    options: SAMPLE_OPTIONS,
  },
}

export const WithSelectedValue: Story = {
  args: {
    name: 'category',
    label: 'Категория вещи',
    placeholder: 'Выберите категорию вещи',
    value: 'electronics',
    options: SAMPLE_OPTIONS,
  },
}

export const Open: Story = {
  args: {
    name: 'category',
    label: 'Категория вещи',
    placeholder: 'Выберите категорию вещи',
    value: '',
    options: SAMPLE_OPTIONS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
  },
}

export const WithError: Story = {
  args: {
    name: 'category',
    label: 'Категория вещи',
    placeholder: 'Выберите категорию вещи',
    value: '',
    options: SAMPLE_OPTIONS,
    error: 'Выберите категорию',
  },
}
