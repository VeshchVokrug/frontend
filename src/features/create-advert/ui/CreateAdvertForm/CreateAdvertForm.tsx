'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ZodFormattedError } from 'zod'
import { toast } from 'sonner'
import { Calendar } from '@/widgets/calendar'
import AdvertSelect from '../../../../shared/ui/Select'
import UploadInput from '@/shared/ui/UploadInput'
import { createAdvertSchema, CreateAdvertInputData } from '../../model/schema'
import { useCurrentUser } from '@/entities/user/model/use-current-user'

import { CATEGORIES } from '@/shared/constants/categories'
import { useCreateAdvert } from '../../model/use-create-advert'
import Input from '@/shared/ui/Input'

export default function CreateAdvertForm() {
  const { mutate: createAdvert } = useCreateAdvert()
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()

  const [advertData, setAdvertData] = useState<CreateAdvertInputData>({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    city: '',
    phone: '',
    busyDates: [],
    photos: [],
  })

  const [errors, setErrors] =
    useState<ZodFormattedError<CreateAdvertInputData> | null>(null)

  const set = <K extends keyof CreateAdvertInputData>(
    key: K,
    value: CreateAdvertInputData[K]
  ) => setAdvertData((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    setErrors(null)

    if (!currentUser) {
      toast.error('Не удалось получить данные пользователя')
      return
    }

    const result = createAdvertSchema.safeParse(advertData)

    if (!result.success) {
      setErrors(result.error.format())
      return
    }

    createAdvert(
      {
        ...advertData,
        managerId: currentUser.id,
        managerName: currentUser.name,
      },
      {
        onSuccess: (response) => router.push(`/catalog/${response.listingId}`),
      }
    )
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h1 className="mb-21 text-[40px] font-bold">Создание карточки вещи</h1>
      <div className="flex w-full gap-3.75">
        <div className="flex w-full flex-col gap-9.5">
          <fieldset className="flex w-full max-w-327 flex-col gap-9.5">
            <Input
              name="name"
              label="Название вещи"
              placeholder="Введите название вещи"
              value={advertData.name}
              onChange={(e) => set('name', e.target.value)}
              error={errors?.name?._errors.join(', ')}
              layout="horizontal"
              size="lg"
              variant="filled"
            />
            <Input
              type="textarea"
              name="description"
              label="Описание вещи"
              placeholder="Введите описание вещи"
              value={advertData.description}
              onChange={(e) => set('description', e.target.value)}
              required={false}
              error={errors?.description?._errors.join(', ')}
              layout="horizontal"
              size="lg"
              variant="filled"
            />
          </fieldset>

          <fieldset className="flex w-fit flex-col gap-9.5">
            <AdvertSelect
              name="category"
              label="Категория вещи"
              value={advertData.category}
              placeholder="Выберите категорию вещи"
              options={CATEGORIES.map(({ title, slug }) => ({
                text: title,
                value: slug,
              }))}
              onChange={(val) => {
                set('category', val)
                set('subcategory', '')
              }}
              error={errors?.category?._errors.join(', ')}
            />

            {advertData.category && (
              <AdvertSelect
                name="subcategory"
                label="Подкатегория вещи"
                value={advertData.subcategory || ''}
                placeholder="Выберите подкатегорию вещи"
                options={[
                  { text: 'Подкатегория 1', value: 'subcategory1' },
                  { text: 'Подкатегория 2', value: 'subcategory2' },
                ]}
                onChange={(val) => set('subcategory', val)}
                error={errors?.subcategory?._errors.join(', ')}
              />
            )}

            <div className="w-179">
              <Input
                type="number"
                name="price"
                label="Стоимость вещи"
                value={advertData.price === 0 ? '' : String(advertData.price)}
                placeholder="Укажите стоимость в рублях"
                onChange={(e) => set('price', Number(e.target.value))}
                error={errors?.price?._errors.join(', ')}
                layout="horizontal"
                size="lg"
                variant="filled"
              />
            </div>

            <div className="w-229.5">
              <Input
                type="text"
                name="city"
                label="Город"
                placeholder="Введите название города"
                value={advertData.city}
                onChange={(e) => set('city', e.target.value)}
                error={errors?.city?._errors.join(', ')}
                required
                layout="horizontal"
                size="lg"
                variant="filled"
              />
            </div>

            <div className="w-229.5">
              <Input
                type="tel"
                label="Телефон"
                placeholder="Ваш номер в формате +7( )"
                name="phone"
                value={advertData.phone}
                onChange={(e) => set('phone', e.target.value)}
                error={errors?.phone?._errors.join(', ')}
                required={false}
                layout="horizontal"
                size="lg"
                variant="filled"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex gap-9.5">
                <span className="text-[32px] font-bold">Недоступные даты</span>
                <Calendar
                  buttonText="Добавить дату"
                  mode="create"
                  onSelect={(dates) => set('busyDates', dates)}
                />
              </div>
              {errors?.busyDates?._errors.length && (
                <p className="mt-1 text-2xl text-red-500">
                  {errors.busyDates._errors.join(', ')}
                </p>
              )}
            </div>
          </fieldset>

          <UploadInput
            label="Фото вещи"
            onChange={(files) =>
              set(
                'photos',
                files.map((f) => f.name)
              )
            }
            error={errors?.photos?._errors.join(', ')}
          />
        </div>

        <button
          type="submit"
          className="bg-main hover:bg-main-hover disabled:bg-disabled active:bg-main-active mt-auto mb-14 ml-auto h-fit rounded-4xl px-7.5 py-5 text-[30px]/[36px] font-bold text-nowrap text-white transition"
        >
          Предпросмотр карточки
        </button>
      </div>
    </form>
  )
}
