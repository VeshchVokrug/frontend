export type ImagePosition = 'bottom-right' | 'top-left'

export type TitlePosition = 'left' | 'right' | 'center-right'

export interface CategoryCardProps {
  title: string
  image: string
  colSpan?: number
  rowSpan?: number
  imagePosition?: ImagePosition
  titlePosition?: TitlePosition
  href: string
  customStyles?: object
}
