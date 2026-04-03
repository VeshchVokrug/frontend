import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CategoryCard from './CategoryCard'

const meta: Meta<typeof CategoryCard> = {
  title: 'shared/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CategoryCard>

const withGrid = (Story: React.ComponentType) => (
  <div className="grid h-44 grid-cols-32 grid-rows-2 gap-4">
    <Story />
  </div>
)

export const Default: Story = {
  decorators: [withGrid],
  args: {
    title: 'Категория',
    image: '/images/categories/electronics.svg',
    href: '/categories/1',
  },
}

export const Wide: Story = {
  decorators: [withGrid],
  args: {
    title: 'Широкая',
    image: '/images/categories/electronics.svg',
    href: '/categories/1',
    colSpan: 10,
  },
}

export const Tall: Story = {
  decorators: [withGrid],
  args: {
    title: 'Высокая',
    image: '/images/categories/electronics.svg',
    href: '/categories/1',
    rowSpan: 2,
    titlePosition: 'center-right',
    imagePosition: 'top-left',
  },
}
