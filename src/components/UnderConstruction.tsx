import { Wrench, Hammer } from 'lucide-react'

export default function UnderConstruction() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="text-center">
        <div className="mx-auto mb-4 flex items-center justify-center gap-2">
          <Hammer className="h-10 w-10" aria-hidden="true" />
          <Wrench className="h-10 w-10" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-semibold">Esta página está en construcción</h1>
      </section>
    </main>
  )
}
