import { NavLink, useLocation } from 'react-router-dom'

import { Button } from '@/shared/ui'

import { counterPrim, Lore, Site, usefulLinks, waiting } from '../../const/routes'

export const Links = () => {
  const location = useLocation()
  return (
    <nav className='flex flex-col md:flex-row gap-1 lg:gap-2'>
      <Button component={NavLink} to={Site + waiting} isActive={location.pathname === Site + waiting}>
        Ждем персонажа
      </Button>
      <Button component={NavLink} to={Site + counterPrim} isActive={location.pathname === Site + counterPrim}>
        Счетчик примогемов
      </Button>
      <Button component={NavLink} to={Site + usefulLinks} isActive={location.pathname === Site + usefulLinks}>
        Сайты
      </Button>
      <Button component={NavLink} to={Site + Lore} isActive={location.pathname === Site + Lore}>
        Лор
      </Button>
    </nav>
  )
}
