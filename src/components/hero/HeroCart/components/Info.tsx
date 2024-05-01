import { obj } from '../../../../store/slices/calcPrimogemObj'

import s from '../HeroCart.module.scss'

type InfoCart = {
  obj: obj
  primogems: number
  primogemsMinusSumm: number
  initialCountPrimogems: number
}

export const Info = ({ obj, primogems, primogemsMinusSumm, initialCountPrimogems }: InfoCart) => {
  const lastWishes = Math.floor(primogemsMinusSumm / 160)
  return (
    <div className={s.information}>
      <p>
        Количество примогемов:<br></br> {obj.countSave}
      </p>
      <p>
        Количество в крутках:<br></br> {obj.countSumm ? obj.countSumm : '0'}
      </p>
      <p>
        Остаток:<br></br> {primogems && primogemsMinusSumm}
      </p>
      <p>
        Остаток в крутках:<br></br> {lastWishes}
        <span className={s.sideWishes}>
          {initialCountPrimogems > 0 ? `+${initialCountPrimogems}=${+lastWishes + +initialCountPrimogems}` : ''}
        </span>
      </p>
      <p>
        Дней до конца накопления:<br></br> {obj.between ? obj.between - obj.now : 'Нет конечной даты'}
      </p>
      <p>
        Какой сейчас день накопления:<br></br>
        {obj.now}
      </p>
      <p>
        Будет к концу даты:<br></br>
        {obj.betweenSumm ? obj.betweenSumm : 'Нет конечной даты'}
      </p>
    </div>
  )
}
