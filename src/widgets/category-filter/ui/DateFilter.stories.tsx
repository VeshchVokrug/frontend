import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DateFilter from './DateFilter'
import { DATE_OPTIONS } from '@/shared/constants/filter'

const meta: Meta<typeof DateFilter> = {
  title: 'widgets/category-filter/DateFilter',
  component: DateFilter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DateFilter>

export const Default: Story = {
  args: {
    dates: DATE_OPTIONS,
    date: 'any',
    onChange: () => {},
  },
}

export const DateSelected: Story = {
  args: {
    dates: DATE_OPTIONS,
    date: 'today',
    onChange: () => {},
  },
}
