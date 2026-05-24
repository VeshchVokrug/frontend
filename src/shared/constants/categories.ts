import { CategoryCardProps } from '@/shared/ui/CategoryCard/type'

export interface Subcategory {
  value: string
  displayName: string
}

export interface Category extends Omit<CategoryCardProps, 'subcategories'> {
  subcategories?: Subcategory[]
}

export const CATEGORIES: Category[] = [
  {
    title: 'Электроника',
    slug: 'electronics',
    image: '/images/categories/electronics.svg',
    href: '/catalog?categorySlug=electronics',
    colSpan: 5,
    rowSpan: 1,
    imagePosition: 'top-left',
    titlePosition: 'center-right',
    subcategories: [
      { value: 'electronics.photo', displayName: 'Фото и видео' },
      { value: 'electronics.audio', displayName: 'Аудио' },
      { value: 'electronics.consoles', displayName: 'Игровые консоли' },
      { value: 'electronics.projectors', displayName: 'Проекторы и экраны' },
    ],
  },

  {
    title: 'Детские товары',
    slug: 'kids',
    image: '/images/categories/children-goods.svg',
    href: '/catalog?categorySlug=kids',
    colSpan: 5,
    rowSpan: 1,
    imagePosition: 'bottom-right',
    titlePosition: 'left',
    customStyles: {
      paddingRight: '50px',
    },
    subcategories: [
      { value: 'kids.transport', displayName: 'Коляски и автокресла' },
      { value: 'kids.toys', displayName: 'Развивающие игрушки' },
      { value: 'kids.furniture', displayName: 'Детская мебель' },
      { value: 'kids.sport', displayName: 'Детский спорт' },
    ],
  },
  {
    title: 'Медицинское оборудование для реабилитации',
    slug: 'medical',
    image: '/images/categories/medical-equipment.svg',
    href: '/catalog?categorySlug=medical',
    colSpan: 5,
    rowSpan: 2,
    imagePosition: 'bottom-right',
    titlePosition: 'left',
    subcategories: [
      { value: 'medical.mobility', displayName: 'Костыли, ходунки, трости' },
      { value: 'medical.wheelchairs', displayName: 'Инвалидные коляски' },
      { value: 'medical.ortho', displayName: 'Ортопедические изделия' },
      { value: 'medical.physio', displayName: 'Аппараты для физиотерапии' },
    ],
  },
  {
    title: 'Спорт и активный отдых',
    slug: 'sport',
    image: '/images/categories/sport.svg',
    href: '/catalog?categorySlug=sport',
    colSpan: 6,
    rowSpan: 1,
    imagePosition: 'bottom-right',
    titlePosition: 'left',
    subcategories: [
      { value: 'sport.winter', displayName: 'Зимний спорт' },
      { value: 'sport.transport', displayName: 'Средства передвижения' },
      { value: 'sport.water', displayName: 'Водный спорт' },
      { value: 'sport.camping', displayName: 'Кемпинг' },
      { value: 'sport.fitness', displayName: 'Фитнес-оборудование' },
    ],
  },
  {
    title: 'Одежда и аксессуары',
    slug: 'fashion',
    image: '/images/categories/clothes.svg',
    href: '/catalog?categorySlug=fashion',
    colSpan: 6,
    rowSpan: 1,
    imagePosition: 'top-left',
    titlePosition: 'left',
    customStyles: {
      paddingLeft: '127px',
    },
    subcategories: [
      { value: 'fashion.outerwear', displayName: 'Верхняя одежда' },
      { value: 'fashion.formal', displayName: 'Костюмы и вечерние наряды' },
      { value: 'fashion.wedding', displayName: 'Свадебная атрибутика' },
      { value: 'fashion.accessories', displayName: 'Аксессуары' },
    ],
  },
  {
    title: 'Хобби и творчество',
    slug: 'hobby',
    image: '/images/categories/hobbies.svg',
    href: '/catalog?categorySlug=hobby',
    colSpan: 5,
    rowSpan: 2,
    imagePosition: 'bottom-right',
    titlePosition: 'left',
    subcategories: [
      { value: 'hobby.games', displayName: 'Настольные игры' },
      { value: 'hobby.sewing', displayName: 'Швейное оборудование' },
      { value: 'hobby.art', displayName: 'Художественное оборудование' },
    ],
  },
  {
    title: 'Строительные инструменты и техника',
    slug: 'construction',
    image: '/images/categories/tools.svg',
    subcategories: [
      { value: 'construction.powertools', displayName: 'Электроинструменты' },
      { value: 'construction.handtools', displayName: 'Ручной инструмент' },
      {
        value: 'construction.equipment',
        displayName: 'Строительное оборудование',
      },
      { value: 'construction.garden', displayName: 'Садовая техника' },
    ],
    href: '/catalog?categorySlug=construction',
    colSpan: 10,
    rowSpan: 1,
    imagePosition: 'top-left',
    titlePosition: 'center-right',
    customStyles: {
      paddingLeft: '121px',
    },
  },
  {
    title: 'Праздники и мероприятия',
    slug: 'events',
    image: '/images/categories/events.svg',
    href: '/catalog?categorySlug=events',
    colSpan: 6,
    rowSpan: 1,
    imagePosition: 'bottom-right',
    titlePosition: 'left',
    subcategories: [
      { value: 'events.decor', displayName: 'Декор и реквизит' },
      { value: 'events.soundlight', displayName: 'Звук и свет' },
      { value: 'events.furniture', displayName: 'Мебель и посуда' },
      { value: 'events.costumes', displayName: 'Костюмы' },
    ],
  },

  {
    title: 'Музыкальное оборудование',
    slug: 'music',
    image: '/images/categories/musical-equipment.svg',
    href: '/catalog?categorySlug=music',
    colSpan: 6,
    rowSpan: 1,
    imagePosition: 'bottom-right',
    titlePosition: 'left',
    subcategories: [
      { value: 'music.strings', displayName: 'Гитарные и струнные' },
      { value: 'music.keyboards', displayName: 'Клавишные и синтезаторы' },
      { value: 'music.drums', displayName: 'Ударные и перкуссия' },
      { value: 'music.amps', displayName: 'Усилители и комбо' },
    ],
  },
]
