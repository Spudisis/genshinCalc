import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import s from './addPrimogems.module.scss'

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
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.inputs}>
        <div className={s.inputBlock}>
          <label>
            Количество примогемов
            <input type='number' {...register('countPrimogems')} placeholder='Количество' />
          </label>
          <p className={s.errorMessage}>{errors.countPrimogems?.message}</p>
        </div>
        <div className={s.inputBlock}>
          <label>
            Количество круток
            <input type='number' {...register('countWishes')} placeholder='Количество' />
          </label>
          <p className={s.errorMessage}>{errors.countWishes?.message}</p>
        </div>
        <div className={s.inputBlock}>
          <label>
            Количество блеска
            <input type='number' {...register('countStarglitter')} id='countStarglitter' placeholder='Количество' />
          </label>
          <p className={s.errorMessage}>{errors.countStarglitter?.message}</p>
        </div>
      </div>

      <button type='submit' className={s.submit}>
        Добавить
      </button>
    </form>
  )
}
