import { Icon } from '@/components/icon'

import { Button } from '@/shared/ui'

import wish from '../../../assets/Objeto_Destino_entrelazado.webp'
import { Site, waiting } from '../../../const/routes'
import { storeItem } from '../../../store/types/items'
import { CreateHero } from '../../CreateHero/CreateHero'
import { HeroCart } from '../HeroCart/HeroCart'
import { Hero } from '../HeroTable/HeroTable'

import s from './HeroList.module.scss'

interface HeroListViewTypes {
  store: any

  setTypeView: (n: boolean) => void
  typeView: boolean
  location: string
}

export const HeroListView = ({ store, setTypeView, typeView, location }: HeroListViewTypes) => {
  const path = Site + waiting

  return (
    <div className={s.wrapper}>
      <div className={s.name}>
        <h2>Накопление</h2>

        <Button onClick={() => setTypeView(!typeView)} className='flex items-center gap-2'>
          <Icon icon={typeView ? 'carbon:table' : 'gridicons:grid'} className='w-5 h-5' /> Вид отображения:{' '}
          {typeView ? 'Таблица' : 'Карточки'}
        </Button>
      </div>

      {typeView ? (
        <div className={s.container}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Кол-во гемов</th>
                <th>Гемов сохранено</th>
                <th>
                  <img src={wish} alt='' />
                </th>
                <th>Излишек</th>
                <th>
                  <img src={wish} alt='' />
                </th>
                <th>Всего дней</th>
                <th>День сейчас</th>
                <th>Будет к концу</th>
                <th>Добавить еще</th>
              </tr>
            </thead>
            <tbody>
              {store.map((elem: storeItem, index: number) => {
                return <Hero {...elem} key={index + 'storeItem'} />
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={s.itemsList}>
          {store.map((elem: storeItem) => {
            return <HeroCart {...elem} key={elem.id} />
          })}

          {location === path && (
            <div className={s.item}>
              <CreateHero />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
