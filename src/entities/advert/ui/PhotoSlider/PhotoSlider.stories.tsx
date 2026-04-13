import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertPhotoSlider from './PhotoSlider'

const meta: Meta<typeof AdvertPhotoSlider> = {
  title: 'entities/advert/PhotoSlider',
  component: AdvertPhotoSlider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdvertPhotoSlider>

export const Default: Story = {
  args: {
    photos: [
      {
        id: 1,
        img: '/images/logo.png',
      },
      {
        id: 2,
        img: '/images/categories/electronics.svg',
      },
      {
        id: 3,
        img: '/images/categories/clothes.svg',
      },
      {
        id: 4,
        img: '/images/categories/events.svg',
      },
      {
        id: 5,
        img: '/images/categories/hobbies.svg',
      },
      {
        id: 6,
        img: '/images/categories/sport.svg',
      },
    ],
  },
}
