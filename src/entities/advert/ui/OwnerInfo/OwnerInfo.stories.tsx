import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import OwnerInfo from './OwnerInfo'

const meta: Meta<typeof OwnerInfo> = {
  title: 'entities/advert/OwnerInfo',
  component: OwnerInfo,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof OwnerInfo>

export const Default: Story = {
  args: {
    name: 'Пользователь',
    status: 'Частное лицо',
    rating: 4.9,
    reviewsCount: 13,
  },
}
