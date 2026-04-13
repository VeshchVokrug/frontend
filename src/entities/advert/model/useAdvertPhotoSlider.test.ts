import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AdvertPhotos } from './schema'
import { useAdvertPhotoSlider } from './useAdvertPhotoSlider'

const sliderState = vi.hoisted(() => ({
  index: 0,
}))

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')

  return {
    ...actual,
    useMemo: ((factory: () => unknown) => factory()) as typeof actual.useMemo,
    useState: (() => {
      const setValue = (value: number | ((prev: number) => number)) => {
        sliderState.index = typeof value === 'function' ? value(sliderState.index) : value
      }

      return [sliderState.index, setValue]
    }) as typeof actual.useState,
  }
})

const photosMock: AdvertPhotos = [
  { id: 0, img: 'img-0' },
  { id: 1, img: 'img-1' },
  { id: 2, img: 'img-2' },
  { id: 3, img: 'img-3' },
  { id: 4, img: 'img-4' },
  { id: 5, img: 'img-5' },
]

describe('useAdvertPhotoSlider', () => {
  beforeEach(() => {
    sliderState.index = 0
  })

  it('возвращает начальное состояние', () => {
    const result = useAdvertPhotoSlider(photosMock)

    expect(result.mainPhoto).toEqual(photosMock[0])
    expect(result.previews).toEqual(photosMock.slice(0, 3))
    expect(result.isFirstPhoto).toBe(true)
    expect(result.isLastPhoto).toBe(false)
  })

  it('setPrevPhoto не уходит ниже 0', () => {
    let result = useAdvertPhotoSlider(photosMock)

    result.setPrevPhoto()
    result = useAdvertPhotoSlider(photosMock)

    expect(result.mainPhoto).toEqual(photosMock[0])
  })

  it('setNextPhoto увеличивает индекс и останавливается на последнем', () => {
    let result = useAdvertPhotoSlider(photosMock)

    for (let i = 0; i < photosMock.length + 2; i += 1) {
      result.setNextPhoto()
    }

    result = useAdvertPhotoSlider(photosMock)

    expect(result.mainPhoto).toEqual(photosMock[photosMock.length - 1])
    expect(result.isLastPhoto).toBe(true)
  })

  it('setPhotoByIndex устанавливает только валидный индекс', () => {
    let result = useAdvertPhotoSlider(photosMock)

    result.setPhotoByIndex(4)
    result = useAdvertPhotoSlider(photosMock)
    expect(result.mainPhoto).toEqual(photosMock[4])

    result.setPhotoByIndex(-1)
    result = useAdvertPhotoSlider(photosMock)
    expect(result.mainPhoto).toEqual(photosMock[4])

    result.setPhotoByIndex(99)
    result = useAdvertPhotoSlider(photosMock)
    expect(result.mainPhoto).toEqual(photosMock[4])
  })

  it('корректно считает окно previews вокруг текущего индекса', () => {
    let result = useAdvertPhotoSlider(photosMock, 3)
    result.setPhotoByIndex(2)
    result = useAdvertPhotoSlider(photosMock, 3)
    expect(result.previews.map((photo) => photo.id)).toEqual([1, 2, 3])

    result.setPhotoByIndex(5)
    result = useAdvertPhotoSlider(photosMock, 3)
    expect(result.previews.map((photo) => photo.id)).toEqual([3, 4, 5])
  })

  it('возвращает все фото, если previewsCount больше длины массива', () => {
    const result = useAdvertPhotoSlider(photosMock, 10)

    expect(result.previews).toEqual(photosMock)
  })
})