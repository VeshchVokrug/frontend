export type ImagePosition = 'bottom-right' | 'top-left'

export type TitlePosition = 'left' | 'right' | 'center-right'

// todo: создать сущность категории, создать там схемы, типы, хуки и необохдимые запросы к api

export interface CategoryCardProps {
  title: string
  slug: string
  image: string
  subcategories?: string[]
  colSpan?: number
  rowSpan?: number
  imagePosition?: ImagePosition
  titlePosition?: TitlePosition
  href: string
  customStyles?: object
}
