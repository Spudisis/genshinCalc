import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { auth, CheckUser } from '@/firebase'

import './style/resize.css'
import './style/theme.css'
import './index.css'

import { Loader } from './components/'
import { counterPrim, heroCart, idHeroCart, Lore, more, Site, usefulLinks, waiting } from './const/routes'
import { Footer, Header } from './layout/index'
import { CounterPrim, CreateHero, HeroCart, LorePage, Main, MoreInfoCreateHero, UsefulLinks } from './pages'
import ThemeProvider from './provider/provider'
import { useAppDispatch } from './store/hooks'
import { setUid } from './store/slices/person'

import s from './style/scss/app.module.scss'

export const App = () => {
  const [user, loading] = useAuthState(auth as any)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (user) {
      const uid = user.uid
      dispatch(setUid(uid))
      CheckUser({ uid, dispatch })
    }
  }, [user, dispatch])

  return (
    <ThemeProvider>
      <div className={s.wrapper}>
        {loading ? (
          <Loader />
        ) : (
          <BrowserRouter>
            <Header />
            <main>
              <Routes>
                <Route path={Site} element={<Main />}></Route>
                <Route path={Site + waiting} element={<CreateHero />}></Route>
                <Route path={Site + waiting + more} element={<MoreInfoCreateHero />}></Route>
                <Route path={Site + waiting + heroCart + idHeroCart} element={<HeroCart />}></Route>
                <Route path={Site + Lore} element={<LorePage />}></Route>
                <Route path={Site + usefulLinks} element={<UsefulLinks />}></Route>
                <Route path={Site + counterPrim} element={<CounterPrim />}></Route>
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        )}
      </div>
    </ThemeProvider>
  )
}
