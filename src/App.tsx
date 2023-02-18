import React from "react";
import { Header, Footer } from "./layout/index";
import "./style/resize.css";
import s from "./style/scss/app.module.scss";
import "./style/theme.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { useAuthState } from "react-firebase-hooks/auth";

import { CounterPrim, CreateHero, HeroCart, Main, MoreInfoCreateHero, LorePage } from "./pages";
import { auth, CheckUser } from "./firebase/index";
import { setUid } from "./store/slices/person";
import { Loader } from "./components/";
import { counterPrim, heroCart, idHeroCart, Lore, more, Site, waiting } from "./const/routes";
import ThemeProvider from "./provider/provider";

export const App = () => {
  const [user, loading] = useAuthState(auth as any);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (user) {
      const uid = user.uid;
      dispatch(setUid(uid));
      CheckUser({ uid, dispatch });
    }
  }, [user, dispatch]);

  return (
    <ThemeProvider>
      <div className={s.wrapper}>
        {loading ? (
          <Loader />
        ) : (
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path={Site} element={<Main />}></Route>
                <Route path={Site + waiting} element={<CreateHero />}></Route>
                <Route path={Site + waiting + more} element={<MoreInfoCreateHero />}></Route>
                <Route path={Site + waiting + heroCart + idHeroCart} element={<HeroCart />}></Route>
                <Route path={Site + Lore} element={<LorePage />}></Route>
                <Route path={Site + counterPrim} element={<CounterPrim />}></Route>
              </Routes>
            </main>
            <Footer />
          </Router>
        )}
      </div>
    </ThemeProvider>
  );
};
