import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ShareCard from './ShareCard'

const meta: Meta<typeof ShareCard> = {
  title: 'Entities/Coownership/ShareCard',
  component: ShareCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

const nextWeek = new Date()
nextWeek.setDate(nextWeek.getDate() + 7)

export const Default: Story = {
  args: {
    available: 10,
    price: 50000,
    endDate: nextWeek,
  },
}

export const SoldOut: Story = {
  args: {
    available: 0,
    price: 100000,
    endDate: nextWeek,
  },
}
