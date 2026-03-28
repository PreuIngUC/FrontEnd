import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface TextFieldProps<T extends FieldValues> {
  label: string
  placeholder?: string
  register: UseFormRegister<T>
  errorMessage?: string
  prop: Path<T>
  type?: 'text' | 'date'
  readOnly?: boolean
}

function TextField<T extends FieldValues>({
  label,
  placeholder,
  register,
  errorMessage,
  prop,
  type = 'text',
  readOnly = false,
}: TextFieldProps<T>) {
  // Clases base consistentes con NumberField y SelectField
  const baseInputClasses = `
    w-full px-4 py-2 mt-1 
    bg-white 
    border rounded-xl shadow-sm 
    transition-colors duration-200 
    focus:outline-none focus:ring-2
  `

  // Clases dinámicas según el estado
  const normalClasses = 'border-sky-200 focus:border-sky-500 focus:ring-sky-200 text-slate-700'
  const errorClasses =
    'border-red-400 focus:border-red-500 focus:ring-red-200 text-red-900 bg-red-50/50'
  const readOnlyClasses = 'bg-transparent border-transparent shadow-none px-0 text-slate-800'
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-blue-900">{label}</label>

      <input
        type={type}
        {...register(prop)}
        placeholder={placeholder}
        className={`${baseInputClasses} ${readOnly ? readOnlyClasses : errorMessage ? errorClasses : normalClasses}`}
        readOnly={readOnly}
      />

      {/* Contenedor reservado para el mensaje de error de Zod */}
      <div className="min-h-[20px] mt-1">
        {errorMessage && <p className="text-xs text-red-600 font-medium">* {errorMessage}</p>}
      </div>
    </div>
  )
}

export default TextField
