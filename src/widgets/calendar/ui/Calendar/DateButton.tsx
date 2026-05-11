import { SelectHandlers } from '../../model/types'

type Props = {
  date: Date | ''
  isActive: boolean
  isSelected: boolean
  isPreview: boolean
  isUnavailableInPreview: boolean
  previewMode: 'select' | 'deselect'
  onSelect: SelectHandlers
}

export default function DateButton({
  date,
  isActive,
  isSelected,
  isPreview,
  isUnavailableInPreview,
  previewMode,
  onSelect,
}: Props) {
  if (date === '') {
    return <div className="text-[30px] opacity-0 select-none">0</div>
  }

  return (
    <div
      data-date={date.toISOString()}
      className={`relative isolate cursor-pointer touch-none text-[30px] transition-all select-none ${!isActive && !isPreview ? 'text-unvailable pointer-events-none' : ''} ${isSelected && !isPreview ? 'text-main' : ''} ${isPreview && isUnavailableInPreview ? 'text-red scale-110 opacity-75' : ''} ${isPreview && !isUnavailableInPreview && previewMode === 'select' ? 'text-main scale-110 opacity-50' : ''} ${isPreview && !isUnavailableInPreview && previewMode === 'deselect' ? 'text-red scale-110 opacity-50' : ''} `}
      onPointerDown={(e) => onSelect.pointerDown(date, e)}
      onPointerEnter={(e) => onSelect.pointerEnter(date, e)}
      onPointerMove={(e) => onSelect.pointerMove(date, e)}
      onPointerUp={(e) => onSelect.pointerUp(date, e)}
    >
      <span className="pointer-events-none">{date.getDate()}</span>
    </div>
  )
}
