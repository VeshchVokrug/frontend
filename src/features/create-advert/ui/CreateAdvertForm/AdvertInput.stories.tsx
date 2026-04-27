import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AdvertInput from './AdvertInput'

const meta: Meta<typeof AdvertInput> = {
  title: 'features/create-advert/AdvertInput',
  component: AdvertInput,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdvertInput>

export const Default: Story = {
  args: {
    name: 'name',
    label: 'Название вещи',
    placeholder: 'Введите название вещи',
    value: '',
  },
}

export const WithValue: Story = {
  args: {
    name: 'name',
    label: 'Название вещи',
    placeholder: 'Введите название вещи',
    value: 'Велосипед горный',
  },
}

export const WithError: Story = {
  args: {
    name: 'name',
    label: 'Название вещи',
    placeholder: 'Введите название вещи',
    value: 'В',
    error: 'Название должно содержать не менее 2 символов',
  },
}

export const Textarea: Story = {
  args: {
    type: 'textarea',
    name: 'description',
    label: 'Описание вещи',
    placeholder: 'Введите описание вещи',
    value: '',
  },
}

export const TextareaWithValue: Story = {
  args: {
    type: 'textarea',
    name: 'description',
    label: 'Описание вещи',
    placeholder: 'Введите описание вещи',
    value: 'Горный велосипед в отличном состоянии, почти не использовался.',
  },
}

export const TextareaWithError: Story = {
  args: {
    type: 'textarea',
    name: 'description',
    label: 'Описание вещи',
    placeholder: 'Введите описание вещи',
    value: 'А'.repeat(301),
    error: 'Описание должно содержать не более 300 символов',
  },
}

export const NumberInput: Story = {
  args: {
    type: 'number',
    name: 'price',
    label: 'Стоимость вещи',
    placeholder: 'Укажите стоимость в рублях',
    value: '',
  },
}

export const NumberInputWithValue: Story = {
  args: {
    type: 'number',
    name: 'price',
    label: 'Стоимость вещи',
    placeholder: 'Укажите стоимость в рублях',
    value: '1500',
  },
}
