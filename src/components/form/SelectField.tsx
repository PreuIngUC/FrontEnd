import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface Option {
  value: string | number
  label: string
}

interface SelectFieldProps<T extends FieldValues> {
  label: string
  register: UseFormRegister<T>
  errorMessage?: string
  prop: Path<T>
  options: Option[]
}

function SelectField<T extends FieldValues>({
  label,
  register,
  errorMessage,
  prop,
  options,
}: SelectFieldProps<T>) {
  // Clases base consistentes con el resto de los inputs
  const baseSelectClasses = `
    w-full px-4 py-2 mt-1 
    bg-white 
    border rounded-xl shadow-sm 
    transition-colors duration-200 
    focus:outline-none focus:ring-2
    cursor-pointer
  `

  // Clases dinámicas según el estado (normal o error)
  const normalClasses = 'border-sky-200 focus:border-sky-500 focus:ring-sky-200 text-slate-700'
  const errorClasses =
    'border-red-400 focus:border-red-500 focus:ring-red-200 text-red-900 bg-red-50/50'

  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-blue-900">{label}</label>

      <select
        defaultValue=""
        {...register(prop)}
        className={`${baseSelectClasses} ${errorMessage ? errorClasses : normalClasses}`}
      >
        <option value="" disabled hidden>
          Selecciona una opción...
        </option>

        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Contenedor reservado para evitar que el layout salte */}
      <div className="min-h-[20px] mt-1">
        {errorMessage && <p className="text-xs text-red-600 font-medium">* {errorMessage}</p>}
      </div>
    </div>
  )
}

export default SelectField
