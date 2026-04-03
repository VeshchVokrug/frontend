import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeaderLink from './HeaderLink'

const meta: Meta<typeof HeaderLink> = {
  title: 'shared/HeaderLink',
  component: HeaderLink,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HeaderLink>

export const Default: Story = {
  args: {
    text: 'Профиль',
    image: '/images/icons/profile.svg',
    href: '/profile',
  },
}
