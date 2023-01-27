import React from "react";
import s from "./Image.module.scss";

import { useAppSelector } from "../../../store/hooks";
import { storeItem } from "../../../store/types/items";
import { ImageContain } from "../../hero/HeroCart/components/imageContain";

type Img = {
  id: string;
  setSizeImg: ([n, b]: [T: number, U: number]) => void;
};

export const Image = ({ id, setSizeImg }: Img) => {
  const uid = useAppSelector((state) => state.person.id);
  const store = useAppSelector((store) => store.heroes.heroes);
  const [cart, setCart] = React.useState<storeItem>();

  React.useEffect(() => {
    const cart = store.find((elem: storeItem) => id && elem.id === +id);
    if (cart) setCart(cart);
  }, [store, id]);

  return (
    <>
      {cart && cart.image && (
        <div className={s.image}>
          <ImageContain uid={uid} image={cart.image} imagePath={cart.imagePath} setSizeImg={setSizeImg} />
        </div>
      )}
    </>
  );
};
