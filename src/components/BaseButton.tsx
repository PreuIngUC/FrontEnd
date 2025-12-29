import React from 'react'

interface BaseButtonProps {
  children: React.ReactNode
}

function BaseButton({ children }: BaseButtonProps) {
  return (
    <button
      className="
            bg-sky-300
            text-blue-900
            hover:bg-sky-700
            hover:text-sky-300
            hover:-translate-y-1
            p-2
            transition
            w-7/12
            md:w-4/12
            rounded-2xl
            lg:w-3/12
            focus:outline-2
            focus:outline-offset-1
            focus:outline-sky-700
            active:bg-blue-900
            active:text-sky-300
            md:text-xl
            "
    >
      {children}
    </button>
  )
}

export default BaseButton
