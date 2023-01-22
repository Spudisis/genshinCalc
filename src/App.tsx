import React from "react";
import { Header, Footer } from "./layout/index";
import "./style/resize.css";
import s from "./style/scss/app.module.scss";
import "./style/theme.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";

import { CounterPrim, CreateHero, HeroCart, Main, MoreInfoCreateHero } from "./pages";
import { check } from "./api/userApi";
import { setUid } from "./store/slices/person";
import { Loader } from "./components/";
import { counterPrim, heroCart, idHeroCart, more, Site, waiting } from "./const/routes";
import ThemeProvider from "./provider/provider";
import { getOnePrimogems } from "./api/primogems";
import { setOneRow } from "./store/slices/primogems";
import { primogems } from "./store/types/items";

export const App = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    check()
      .then((data: any) => {
        dispatch(setUid(data.id));
        const findOneRow = async () => {
          const res: any = await getOnePrimogems(data.id);
          if (!res) {
            return;
          }
          dispatch(setOneRow(res));
        };
        findOneRow();
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

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
