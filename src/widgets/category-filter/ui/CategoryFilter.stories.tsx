import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CategoryFilter from './CategoryFilter'

const meta: Meta<typeof CategoryFilter> = {
  title: 'widgets/category-filter/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/category/electronics',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CategoryFilter>

const categoryData = {
  title: 'Электроника',
  slug: 'electronics',
  image: '/images/categories/electronics.svg',
  href: '/category/electronics',
  subcategories: ['Телефоны', 'Ноутбуки', 'Планшеты', 'Аксессуары'],
}

export const Default: Story = {
  args: {
    categoryData,
    filterParams: {
      subcategory: '',
      date: 'any',
      priceMin: '',
      priceMax: '',
    },
  },
}

export const WithAllFilters: Story = {
  args: {
    categoryData,
    filterParams: {
      subcategory: 'Ноутбуки',
      date: 'today',
      priceMin: '1000',
      priceMax: '5000',
    },
  },
}
