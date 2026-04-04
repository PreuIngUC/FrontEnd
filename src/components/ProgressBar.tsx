export default function ProgressBar({
  successfulItems,
  errorItems,
  totalItems,
}: {
  successfulItems: number
  errorItems?: number
  totalItems: number
}) {
  if (successfulItems < 0 || (errorItems && errorItems < 0) || totalItems < 0)
    throw new Error('Ninguna cantidad puede ser negativa')
  if (successfulItems > totalItems || (errorItems && errorItems + successfulItems > totalItems))
    throw new Error('Solo puede haber máximo el total de elementos')
  const successRate = 100 * (successfulItems / totalItems)
  const errorRate = 100 * (errorItems ? errorItems / totalItems : 0)
  return (
    <div className="flex w-full h-5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        /*eslint-disable-next-line react/forbid-dom-props*/
        style={{ width: `${successRate}%` }}
      ></div>
      <div
        className="h-full bg-red-500 transition-all duration-300"
        /*eslint-disable-next-line react/forbid-dom-props*/
        style={{ width: `${errorRate}%` }}
      ></div>
    </div>
  )
}
