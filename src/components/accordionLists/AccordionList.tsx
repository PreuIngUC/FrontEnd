import { useState } from 'react'
import React from 'react'
import AccordionItem from './AccordionItem'

function AccordionList({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [openedItem, setOpenedItem] = useState<string | null>(null)
  const onClick = async (title: string) => {
    if (openedItem === title) setOpenedItem(null)
    else setOpenedItem(title)
  }
  return items.map(item => {
    return (
      <div className="text-sm" key={item.title}>
        <AccordionItem
          key={item.title}
          title={item.title}
          content={item.content}
          isOpen={openedItem === item.title}
          onClick={onClick}
        />
      </div>
    )
  })
}

export default AccordionList
