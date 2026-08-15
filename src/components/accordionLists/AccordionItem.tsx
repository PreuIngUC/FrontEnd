import type React from 'react'

function AccordionItem({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string
  content: React.ReactNode
  isOpen: boolean
  onClick: (title: string) => void
}) {
  return (
    <div className="border-b border-gray-200">
      {/* Botón del encabezado */}
      <button
        onClick={() => {
          onClick(title)
        }}
        className="w-full text-left py-4 font-medium flex justify-between items-center"
      >
        <strong>{title}</strong>
        <span>{isOpen ? '-' : '+'}</span>
      </button>

      {/* Contenedor del contenido (Aquí va la magia de la animación) */}
      <div
        className={`transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  )
}

export default AccordionItem
