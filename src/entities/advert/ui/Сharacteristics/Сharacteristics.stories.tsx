import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertСharacteristics from './Сharacteristics'

const meta: Meta<typeof AdvertСharacteristics> = {
  title: 'entities/advert/Сharacteristics',
  component: AdvertСharacteristics,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdvertСharacteristics>

export const Default: Story = {
  args: {
    category: 'строительные инструменты и техника',
    description: 'дрель аккумуляторная мощная',
  },
}
