import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface TextFieldProps<T extends FieldValues> {
  label: string
  placeholder?: string
  register: UseFormRegister<T>
  errorMessage?: string
  prop: Path<T>
  type?: 'text' | 'date'
}

//TODO: definir estilos
//TODO: agregar el comportamiento dentro del error
function TextField<T extends FieldValues>({
  label,
  placeholder,
  register,
  errorMessage,
  prop,
  type = 'text',
}: TextFieldProps<T>) {
  return (
    <div className="">
      <label className="">{label}</label>
      <input type={type} {...register(prop)} placeholder={placeholder} className="" />
      {errorMessage && (
        <p className="">* No cumpliste con el formato de este campo o no lo llenaste</p>
      )}
    </div>
  )
}

export default TextField
