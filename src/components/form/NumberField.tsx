import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface NumberFieldProps<T extends FieldValues> {
  label: string
  placeholder?: string
  register: UseFormRegister<T>
  prop: Path<T>
  errorMessage?: string
  step?: string | number
  readOnly?: boolean
}

function NumberField<T extends FieldValues>({
  label,
  placeholder,
  register,
  prop,
  errorMessage,
  step = '1',
  readOnly = false,
}: NumberFieldProps<T>) {
  // Separamos las clases en constantes para mantener el JSX limpio
  // baseClasses: Lo que siempre tiene el input
  const baseInputClasses = `
    w-full px-4 py-2 mt-1 
    bg-white 
    border rounded-xl shadow-sm 
    transition-colors duration-200 
    focus:outline-none focus:ring-2
  `

  // dynamicClasses: Cambian dependiendo de si hay error o no
  const normalClasses = 'border-sky-200 focus:border-sky-500 focus:ring-sky-200 text-slate-700'
  const errorClasses =
    'border-red-400 focus:border-red-500 focus:ring-red-200 text-red-900 bg-red-50/50'
  const readOnlyClasses = 'bg-transparent border-transparent shadow-none px-0 text-slate-800'
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-blue-900">{label}</label>

      <input
        type={readOnly ? 'text' : 'number'}
        step={step}
        placeholder={placeholder}
        // Unimos las clases base con las dinámicas usando un template string
        className={`${baseInputClasses} ${readOnly ? readOnlyClasses : errorMessage ? errorClasses : normalClasses}`}
        {...register(prop, { valueAsNumber: true })}
        readOnly={readOnly}
      />

      {/* Contenedor de altura fija (min-h) para evitar saltos en la UI cuando aparece el error */}
      <div className="min-h-5 mt-1">
        {errorMessage && <p className="text-xs text-red-600 font-medium">* {errorMessage}</p>}
      </div>
    </div>
  )
}

export default NumberField
