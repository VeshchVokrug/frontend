import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within } from 'storybook/test'
import Calendar from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'entities/advert/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {}

export const WithFirstDateSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '2' }))
  },
}

export const WithRangeSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '2' }))
    await userEvent.click(canvas.getByRole('button', { name: '4' }))
  },
}

export const WithError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '2' }))
    await userEvent.click(canvas.getByRole('button', { name: '10' }))
  },
}

export const NextMonth: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    await userEvent.click(buttons[1])
  },
}
