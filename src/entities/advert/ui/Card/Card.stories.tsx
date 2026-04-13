import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertCard from './Card'

const meta: Meta<typeof AdvertCard> = {
  title: 'entities/advert/Card',
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
