import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form'

interface Option {
  value: string | number
  label: string
}

interface SelectFieldProps<T extends FieldValues> {
  label: string
  register: UseFormRegister<T>
  error: FieldError | undefined
  prop: Path<T>
  options: Option[]
}

function SelectField<T extends FieldValues>({
  label,
  register,
  error,
  prop,
  options,
}: SelectFieldProps<T>) {
  return (
    <div className="">
      <label className="">{label}</label>
      <select {...register(prop)} className="">
        <option value="" disabled hidden>
          Selecciona una opción...
        </option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="">*Debes seleccionar una opción válida</p>}
    </div>
  )
}

export default SelectField
