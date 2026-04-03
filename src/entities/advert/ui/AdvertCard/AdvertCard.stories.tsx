import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertCard from './AdvertCard'

const meta: Meta<typeof AdvertCard> = {
  title: 'entities/AdvertCard',
  component: AdvertCard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdvertCard>

export const Default: Story = {
  args: {
    id: '1',
    category: 'electronics',
    title: 'Название',
    image: '/images/logo.png',
    price: 1500,
  },
}
