import { useState, useMemo } from 'react'
import { AdvertPhotos } from './schema'

export const useAdvertPhotoSlider = (
  photos: AdvertPhotos,
  previewsCount: number = 3
) => {
  const [mainIndex, setMainIndex] = useState(0)

  const previews = useMemo(() => {
    const delta = Math.floor(previewsCount / 2)
    const start = Math.max(0, Math.min(mainIndex - delta, photos.length - previewsCount))
    return photos.slice(start, start + previewsCount)
  }, [mainIndex, previewsCount, photos])

  const setPrevPhoto = () => setMainIndex((i) => Math.max(0, i - 1))
  const setNextPhoto = () => setMainIndex((i) => Math.min(photos.length - 1, i + 1))
  const setPhotoByIndex = (index: number) => {
    if (index >= 0 && index < photos.length) setMainIndex(index)
  }

  return {
    previews,
    mainPhoto: photos[mainIndex],
    isFirstPhoto: mainIndex === 0,
    isLastPhoto: mainIndex === photos.length - 1,
    setPrevPhoto,
    setNextPhoto,
    setPhotoByIndex,
  }
}
