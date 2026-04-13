import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertHeader from './Header'

const meta: Meta<typeof AdvertHeader> = {
  title: 'entities/advert/Header',
  component: AdvertHeader,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdvertHeader>

export const Default: Story = {
  args: {
    title: 'Дрель аккумуляторная',
    price: 1500,
  },
}
