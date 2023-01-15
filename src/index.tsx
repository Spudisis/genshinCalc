import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";

import { store, persister } from "./store/store";
import { StrictMode } from "react";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
);
