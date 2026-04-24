import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SubcategoryFilter from './SubcategoryFilter'

const meta: Meta<typeof SubcategoryFilter> = {
  title: 'widgets/category-filter/SubcategoryFilter',
  component: SubcategoryFilter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubcategoryFilter>

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
    subcategory: '',
    onSelect: () => {},
  },
}

export const WithSubcategorySelected: Story = {
  args: {
    categoryData,
    subcategory: 'Ноутбуки',
    onSelect: () => {},
  },
}

export const WithoutSubcategories: Story = {
  args: {
    categoryData: {
      title: 'Спорт',
      slug: 'sport',
      image: '/images/categories/sport.svg',
      href: '/category/sport',
    },
    subcategory: '',
    onSelect: () => {},
  },
}
