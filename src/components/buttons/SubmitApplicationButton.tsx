interface SubmitApplicationButtonProps {
  disabled: boolean
}

function SubmitApplicationButton({ disabled }: SubmitApplicationButtonProps) {
  // Clases estructurales (siempre presentes)
  const baseClasses = `
    w-full py-3 px-6 
    rounded-2xl font-bold text-lg sm:text-xl
    transition-all duration-200
    focus:outline-2 focus:outline-offset-2 focus:outline-sky-700
    flex justify-center items-center
  `

  // Clases dinámicas: cuando el formulario está listo para enviarse
  const enabledClasses = `
    bg-sky-300 text-blue-900 shadow-md
    hover:bg-sky-700 hover:text-sky-300 hover:-translate-y-1 hover:shadow-lg
    active:bg-blue-900 active:text-sky-300 active:translate-y-0 active:shadow-md
  `

  // Clases dinámicas: cuando se hizo clic y está en proceso de envío
  // Usamos tonos grises/desaturados para indicar inactividad
  const disabledClasses = `
    bg-slate-300 text-slate-500 cursor-not-allowed opacity-70
  `

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
    >
      {/* Opcional: Podrías agregar un ícono de carga (spinner) aquí cuando esté disabled */}
      {disabled ? 'Enviando postulación...' : 'Enviar Postulación'}
    </button>
  )
}

export default SubmitApplicationButton
