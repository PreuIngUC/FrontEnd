import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface NumberFieldProps<T extends FieldValues> {
  label: string
  placeholder?: string
  register: UseFormRegister<T>
  prop: Path<T>
  errorMessage?: string
  step?: string | number // Exclusivo de inputs numéricos
}

function NumberField<T extends FieldValues>({
  label,
  placeholder,
  register,
  prop,
  errorMessage,
  step = '1', // Por defecto saltos de a 1 (enteros)
}: NumberFieldProps<T>) {
  return (
    <div className="">
      <label className="">{label}</label>
      <input
        type="number"
        step={step}
        placeholder={placeholder}
        className=""
        // Aquí ocurre la magia de conversión
        {...register(prop, { valueAsNumber: true })}
      />
      {errorMessage && <p className="">* {errorMessage}</p>}
    </div>
  )
}

export default NumberField
