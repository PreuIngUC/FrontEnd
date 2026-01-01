import React from 'react'

interface TransparentButtonProps {
  children: React.ReactNode
}

function TransparentButton({ children }: TransparentButtonProps) {
  return (
    <button
      className="
      bg-sky-300/0
      text-blue-900
      hover:bg-blue-900
      hover:text-sky-300
      p-2
      transition
      font-bold
      md:text-xl
    "
    >
      {children}
    </button>
  )
}

export default TransparentButton
