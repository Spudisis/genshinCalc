import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui'
import { Input } from '@/shared/ui/input'

type add = {
  calcPrimogems: (n: valuesForm) => void
  primogemsCount: number
  wishCount: number
  starglitterCount: number
}

type valuesForm = {
  countPrimogems: number
  countWishes: number
  countStarglitter: number
}

export const FormAdd = ({ calcPrimogems, primogemsCount, wishCount, starglitterCount }: add) => {
  const defaultValues = {
    countPrimogems: primogemsCount,
    countWishes: wishCount,
    countStarglitter: starglitterCount
  }

  const {
    handleSubmit,
    setError,
    reset,
    register,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [primogemsCount, wishCount, starglitterCount])

  const onSubmit = (values: typeof defaultValues) => {
    if (!values.countPrimogems && values.countPrimogems !== 0) {
      setError('countPrimogems', { message: 'Обязательное поле' })
      return
    }
    if (!values.countStarglitter && values.countStarglitter !== 0) {
      setError('countStarglitter', { message: 'Обязательное поле' })
      return
    }
    if (!values.countWishes && values.countWishes !== 0) {
      setError('countWishes', { message: 'Обязательное поле' })
      return
    }
    calcPrimogems(values)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full max-w-48 justify-end'>
      <Input error={errors.countPrimogems?.message} label='Количество примогемов' type='number' {...register('countPrimogems')} />

      <Input error={errors.countWishes?.message} label='Количество круток' type='number' {...register('countWishes')} />
      <Input error={errors.countStarglitter?.message} label='Количество блеска' type='number' {...register('countStarglitter')} />

      <Button type='submit'>Добавить</Button>
    </form>
  )
}
