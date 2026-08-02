import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer, Circle, Text, Group } from 'react-konva'
import Konva from 'konva'
import { useStickerStore, type StickerInstance } from '../../store/useStickerStore'
import { loadStickerImage } from '../../assets/stickers'

interface Size {
  width: number
  height: number
}

interface StickerCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

const TRASH_ZONE = { x0: 0.82, y0: 0.8, x1: 1, y1: 1 }

export function StickerCanvas({ containerRef }: StickerCanvasProps) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const { stickers, selectedId, updateSticker, removeSticker, selectSticker } = useStickerStore()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef])

  if (size.width === 0) return null

  const isOverTrash = (xFrac: number, yFrac: number) =>
    xFrac >= TRASH_ZONE.x0 && xFrac <= TRASH_ZONE.x1 && yFrac >= TRASH_ZONE.y0 && yFrac <= TRASH_ZONE.y1

  return (
    <Stage
      width={size.width}
      height={size.height}
      className="absolute inset-0 z-10"
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) selectSticker(null)
      }}
      onTouchStart={(e) => {
        if (e.target === e.target.getStage()) selectSticker(null)
      }}
    >
      <Layer>
        {stickers.map((sticker) => (
          <StickerNode
            key={sticker.id}
            sticker={sticker}
            containerSize={size}
            isSelected={sticker.id === selectedId}
            onSelect={() => selectSticker(sticker.id)}
            onDragStateChange={(active) => setDraggingId(active ? sticker.id : null)}
            onChange={(patch) => updateSticker(sticker.id, patch)}
            onDropCheck={(xFrac, yFrac) => {
              if (isOverTrash(xFrac, yFrac)) {
                removeSticker(sticker.id)
                return true
              }
              return false
            }}
          />
        ))}

        {draggingId && (
          <Group
            x={TRASH_ZONE.x0 * size.width}
            y={TRASH_ZONE.y0 * size.height}
          >
            <Circle
              radius={Math.min(size.width, size.height) * 0.08}
              x={(TRASH_ZONE.x1 - TRASH_ZONE.x0) * size.width * 0.5}
              y={(TRASH_ZONE.y1 - TRASH_ZONE.y0) * size.height * 0.5}
              fill="rgba(220,38,38,0.85)"
            />
            <Text
              text="🗑️"
              fontSize={Math.min(size.width, size.height) * 0.07}
              x={(TRASH_ZONE.x1 - TRASH_ZONE.x0) * size.width * 0.5 - 16}
              y={(TRASH_ZONE.y1 - TRASH_ZONE.y0) * size.height * 0.5 - 16}
            />
          </Group>
        )}
      </Layer>
    </Stage>
  )
}

interface StickerNodeProps {
  sticker: StickerInstance
  containerSize: Size
  isSelected: boolean
  onSelect: () => void
  onDragStateChange: (active: boolean) => void
  onChange: (patch: Partial<StickerInstance>) => void
  onDropCheck: (xFrac: number, yFrac: number) => boolean
}

function StickerNode({
  sticker,
  containerSize,
  isSelected,
  onSelect,
  onDragStateChange,
  onChange,
  onDropCheck,
}: StickerNodeProps) {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const shapeRef = useRef<Konva.Image>(null)
  const trRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    let cancelled = false
    loadStickerImage(sticker.defId).then((image) => {
      if (!cancelled) setImg(image)
    })
    return () => {
      cancelled = true
    }
  }, [sticker.defId])

  useEffect(() => {
    if (!img || !shapeRef.current) return
    const node = shapeRef.current
    node.scale({ x: 0, y: 0 })
    const tween = new Konva.Tween({
      node,
      duration: 0.6,
      easing: Konva.Easings.BackEaseOut,
      scaleX: 1,
      scaleY: 1,
    })
    tween.play()
    return () => tween.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(img)])

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  if (!img) return null

  const w = sticker.width * containerSize.width
  const h = sticker.height * containerSize.height
  const x = sticker.x * containerSize.width
  const y = sticker.y * containerSize.height

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        image={img}
        x={x}
        y={y}
        width={w}
        height={h}
        offsetX={w / 2}
        offsetY={h / 2}
        rotation={sticker.rotation}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={(e) => {
          onDragStateChange(true)
          e.target.to({ scaleX: 1.1, scaleY: 1.1, shadowBlur: 14, shadowColor: '#000', shadowOpacity: 0.5, duration: 0.15 })
        }}
        onDragMove={() => onDragStateChange(true)}
        onDragEnd={(e) => {
          onDragStateChange(false)
          e.target.to({ scaleX: 1, scaleY: 1, shadowBlur: 0, duration: 0.15 })
          const nx = e.target.x() / containerSize.width
          const ny = e.target.y() / containerSize.height
          if (onDropCheck(nx, ny)) return
          onChange({ x: nx, y: ny })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current!
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          onChange({
            x: node.x() / containerSize.width,
            y: node.y() / containerSize.height,
            width: (w * scaleX) / containerSize.width,
            height: (h * scaleY) / containerSize.height,
            rotation: node.rotation(),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled
          keepRatio
          anchorSize={14}
          borderStroke="#ec4899"
          anchorStroke="#ec4899"
          anchorFill="#ffffff"
          anchorCornerRadius={7}
        />
      )}
    </>
  )
}
