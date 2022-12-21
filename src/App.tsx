import React from "react";
import { Header } from "./components/header/header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useAppDispatch } from "./redux/hooks";
import { clearUid, setUid } from "./redux/slices/person";
import { Loader } from "./components/loader/loader";
import { CheckUser } from "./firebase/checkUser";

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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="genshinCalc/" element={<Main />}></Route>
              <Route path="genshinCalc/waiting" element={"ff"}></Route>
            </Routes>
          </main>
          <footer></footer>
        </Router>
      )}
    </div>
  );
};
