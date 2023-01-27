import React from "react";
import s from "../HeroCart.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateHero } from "../../../../api/heros";
import { useAppDispatch } from "../../../../store/hooks";
import { addGemsItemStore } from "../../../../store/slices/heroes";

type Inputs = {
  initialCount: number;
  add: number;
  id: number;
  setPrimogems: (n: number) => void;
};

export const InputsCart = ({ initialCount, id, setPrimogems, add }: Inputs) => {
  const dispatch = useAppDispatch();

  const [countGemsPlus, setAddPrimogems] = React.useState(0);
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const count = e.currentTarget.value;
    if (count) {
      setPrimogems(+count);
    } else {
      setPrimogems(0);
    }
  };
  const handleAdd = (e: React.FormEvent<HTMLInputElement>) => {
    const count = e.currentTarget.value;
    if (count) {
      setAddPrimogems(+count);
    } else {
      setAddPrimogems(0);
    }
  };
  const sendAdd = () => {
    if (countGemsPlus) {
      let countAdd = add + countGemsPlus;

      updateHero({ countAdd, id }).then(() => dispatch(addGemsItemStore({ countGemsPlus, id })));
    }
  };

  return (
    <div className={s.inputs}>
      <div className={s.countPrimo}>
        <label htmlFor="gemsNow">Сколько гемов</label>
        <input
          type="number"
          id="gemsNow"
          value={initialCount}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
          placeholder="Количество"
        />
      </div>

      <div className={s.addGems}>
        <label htmlFor="gemsAdd">Сколько добавить</label>
        <div className={s.buttonInput}>
          <input
            type="number"
            id="gemsAdd"
            onChange={(e: React.FormEvent<HTMLInputElement>) => handleAdd(e)}
            placeholder="Добавить"
          />
          <button onClick={() => sendAdd()} disabled={countGemsPlus ? false : true}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
        </div>
      </div>
    </div>
  );
};
