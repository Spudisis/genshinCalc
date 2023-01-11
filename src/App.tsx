import React from "react";
import { Header, Footer } from "./layout/index";
import s from "./style/scss/app.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { useAuthState } from "react-firebase-hooks/auth";

import { CounterPrim, CreateHero, Main } from "./pages";
import { auth, CheckUser } from "./firebase/index";
import { setUid } from "./store/slices/person";
import { Loader } from "./components/loader/loader";
import { counterPrim, Site, waiting } from "./const/routes";

export const App = () => {
  const [user, loading, error] = useAuthState(auth as any);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (user) {
      const uid = user.uid;
      dispatch(setUid(uid));
      CheckUser({ uid, dispatch });
    }
  }, [user]);

  return (
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
              <Route path={Site + counterPrim} element={<CounterPrim />}></Route>
            </Routes>
          </main>

          <Footer />
        </Router>
      )}
    </div>
  );
};
