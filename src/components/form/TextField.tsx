import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form'

interface TextFieldProps<T extends FieldValues> {
  label: string
  placeholder?: string
  register: UseFormRegister<T>
  error: FieldError | undefined
  prop: Path<T>
}

//TODO: definir estilos
//TODO: agregar el comportamiento dentro del error
function TextField<T extends FieldValues>({
  label,
  placeholder,
  register,
  error,
  prop,
}: TextFieldProps<T>) {
  return (
    <div className="">
      <label className="">{label}</label>
      <input {...register(prop)} placeholder={placeholder} className="" />
      {error && <p className="">* No cumpliste con el formato de este campo o no lo llenaste</p>}
    </div>
  )
}

export default TextField
