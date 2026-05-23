import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProfileForm from './ProfileForm'
import { fn } from 'storybook/test'

const meta: Meta<typeof ProfileForm> = {
  title: 'shared/ProfileForm',
  component: ProfileForm,
  args: {
    onSubmit: fn(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {
  args: {
    title: 'Создание профиля',
  },
}

export const Edit: Story = {
  args: {
    title: 'Редактирование профиля',
    initialData: {
      name: 'Иван Иванов',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et tempus ipsum, quis efficitur lacus. Integer consectetur dictum lacinia. Proin non elit vitae metus pellentesque facilisis ac eu risus. Morbi feugiat sapien ac metus gravida pharetra. Vestibulum id cursus nulla. Praesent viverra bibendum tristique.',
      phone: '+7(999)123-45-67',
    },
    initialAvatarUrl: 'https://i.pravatar.cc/300',
  },
}

export const Loading: Story = {
  args: {
    title: 'Создание профиля',
    isLoading: true,
  },
}

export const WithServerError: Story = {
  args: {
    title: 'Создание профиля',
    serverError: 'Пользователь с таким именем уже существует',
  },
}

export const EditWithServerError: Story = {
  args: {
    title: 'Редактирование профиля',
    initialData: {
      name: 'Иван Иванов',
      bio: 'Frontend-разработчик с опытом 5 лет',
      phone: '+7(999)123-45-67',
    },
    initialAvatarUrl: 'https://i.pravatar.cc/300',
    serverError: 'Не удалось сохранить изменения',
  },
}
