interface SubmitApplicationButtonProps {
  disabled: boolean
}

//TODO: poner estilos
function SubmitApplicationButton({ disabled }: SubmitApplicationButtonProps) {
  return (
    <button type="submit" disabled={disabled} className="bg-sky-300">
      {disabled ? 'Enviando...' : 'Enviar'}
    </button>
  )
}
export default SubmitApplicationButton
