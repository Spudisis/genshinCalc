import React from "react";
import "./UI/resize.css";
import "./UI/theme.css";
import s from "./UI/scss/app.module.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";

import { CounterPrim, CreateHero, HeroCart, Main, MoreInfoCreateHero, RegistrationNoticed } from "./pages";
import { check } from "./api/CheckToken";
import { setUid } from "./store/slices/person";
import { Loader } from "./components/";
import { counterPrim, heroCart, idHeroCart, more, registrationConfirm, Site, waiting } from "./const/routes";
import ThemeProvider from "./modules/Header/components/Toggle/Provider";
import { getOnePrimogems } from "./api/primogems";
import { setOneRow } from "./store/slices/primogems";
import { Header, Footer } from "./modules/index";
import { NotFound } from "./pages/notFound/NotFound";

export const App = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  const checkToken = async () => {
    try {
      const data = await check();
      const { user } = data.userData;
      if (user.isActivated) {
        dispatch(setUid(user.id));
        const findOneRow = async () => {
          const res: any = await getOnePrimogems(user.id);
          if (!res) {
            return;
          }
          dispatch(setOneRow(res));
        };
        findOneRow();
      }
    } catch (error) {}
    setLoading(false);
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken();
    } else {
      setLoading(false);
    }
  }, [dispatch, checkToken]);

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
                <Route path={Site + registrationConfirm} element={<RegistrationNoticed />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </main>
            <Footer />
          </Router>
        )}
      </div>
    </ThemeProvider>
  );
};
