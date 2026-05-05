import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface CheckboxFieldProps<T extends FieldValues> {
  label: string
  register: UseFormRegister<T>
  errorMessage?: string
  prop: Path<T>
  readOnly?: boolean
}

function CheckboxField<T extends FieldValues>({
  label,
  register,
  errorMessage,
  prop,
  readOnly = false,
}: CheckboxFieldProps<T>) {
  return (
    <div className="flex flex-col w-full">
      <label className="flex items-center gap-3 cursor-pointer py-2">
        <input
          type="checkbox"
          {...register(prop)}
          disabled={readOnly}
          className={`
            w-5 h-5 
            border-sky-300 rounded text-blue-600 
            focus:ring-blue-500 focus:ring-offset-1 
            transition-all duration-200
            ${readOnly ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
          `}
        />
        <span className="text-sm font-semibold text-blue-900">{label}</span>
      </label>

      {/* Contenedor reservado para el mensaje de error de Zod */}
      <div className="min-h-[20px] mt-1">
        {errorMessage && <p className="text-xs text-red-600 font-medium">* {errorMessage}</p>}
      </div>
    </div>
  )
}

export default CheckboxField
