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
  const uid = useAppSelector((state) => state.person.uid);
  const store = useAppSelector((store) => store.person.store);
  const [cart, setCart] = React.useState<storeItem>();
  const [imageFirebase, setImageFirebase] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const cart = store.find((elem: storeItem) => id && elem.id === +id);
    if (cart) setCart(cart);
  }, [store]);
  React.useEffect(() => {
    if (cart && ref.current && ref) {
      setSizeImg([ref.current.offsetHeight, ref.current.offsetWidth]);
    }
  }, [cart]);
  return (
    <>
      {cart && cart.image && (
        <div ref={ref} className={s.image}>
          <ImageContain uid={uid} image={cart.image} setImageFirebase={setImageFirebase} />
        </div>
      )}
    </>
  );
};
