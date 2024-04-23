import { NavLink } from 'react-router-dom'
import { counterPrim, Lore, Site, usefulLinks, waiting } from '../../const/routes'
import s from './Links.module.scss'
export const Links = () => {
  return (
    <div className={s.root}>
      <NavLink to={Site + waiting} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Ждем персонажа
      </NavLink>
      <NavLink to={Site + counterPrim} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Счетчик примогемов
      </NavLink>
      <NavLink to={Site + usefulLinks} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Сайты
      </NavLink>
      <NavLink to={Site + Lore} className={({ isActive }) => (isActive ? s.active : s.inactive)}>
        Лор
      </NavLink>
    </div>
  )
}
