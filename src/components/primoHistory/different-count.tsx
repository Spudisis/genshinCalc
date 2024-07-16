type DifferentCountProps = {
  count: number
}

export const DifferentCount = ({ count }: DifferentCountProps) => {
  return (
    <>{count > 0 ? <div className='text-green-500'>+{count}</div> : count < 0 ? <div className='text-orange-500'>{count}</div> : null}</>
  )
}
