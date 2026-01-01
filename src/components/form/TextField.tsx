import type { UseFormRegister, FieldValues } from 'react-hook-form'

interface TextFieldProps<T extends FieldValues> {
  label: string
  placeholder: string
  register: UseFormRegister<T>
  error: string | null
  prop: string
}

//TODO: definir estilos
//TODO: agregar el comportamiento dentro del error
function TextField({ label, placeholder, register, error, prop }: TextFieldProps) {
  return (
    <div className="">
      <label className="">{label}</label>
      <input {...register(prop)} placeholder={placeholder} className="" />
      {error && <p className="">Falta poner comportamiento al error</p>}
    </div>
  )
}

export default TextField
