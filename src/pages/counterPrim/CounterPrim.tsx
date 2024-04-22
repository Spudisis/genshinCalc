
import s from "../style.module.scss";
import { Info } from "./components/Info";
import { PrimoHistory, AddPrimogems, AdditionalActions } from "../../components";
export const CounterPrim = () => {
  return (
    <div className={s.root}>
      <Info />
      <AdditionalActions />
      <AddPrimogems />
      <PrimoHistory />
    </div>
  );
};
