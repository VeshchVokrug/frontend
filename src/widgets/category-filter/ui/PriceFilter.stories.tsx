import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PriceFilter from './PriceFilter'

const meta: Meta<typeof PriceFilter> = {
  title: 'widgets/category-filter/PriceFilter',
  component: PriceFilter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PriceFilter>

export const Default: Story = {
  args: {
    minPrice: '',
    maxPrice: '',
    onChange: () => {},
  },
}

export const WithMinPrice: Story = {
  args: {
    minPrice: '1000',
    maxPrice: '',
    onChange: () => {},
  },
}

export const WithPriceRange: Story = {
  args: {
    minPrice: '500',
    maxPrice: '3000',
    onChange: () => {},
  },
}
