import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Pagination from './Pagination'
import { useState } from 'react'

const meta: Meta<typeof Pagination> = {
  title: 'shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState<number>(1)
    return <Pagination currentPage={page} totalPages={10} setPage={setPage} />
  },
}
