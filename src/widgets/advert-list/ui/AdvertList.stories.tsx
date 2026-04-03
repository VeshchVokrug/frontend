import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertList from './AdvertList'

const meta: Meta<typeof AdvertList> = {
  title: 'widgets/AdvertList',
  component: AdvertList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdvertList>

export const Default: Story = {
  args: {
    advertList: Array.from({ length: 18 }, (_, index) => ({
      id: String(index + 1),
      title: 'Название',
      category: 'electronics',
      image: '/images/logo.png',
      price: Math.floor(Math.random() * 5000),
    })),
  },
}
