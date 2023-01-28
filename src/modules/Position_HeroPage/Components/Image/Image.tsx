import React from "react";
import s from "./Image.module.scss";

import { useAppSelector } from "../../../../store/hooks";
import { storeItem } from "../../../../store/types/items";
import { ImageContain } from "../../../../components/index";

type Img = {
  id: string;
  setSizeImg: ([n, b]: [T: number, U: number]) => void;
  image: string;
  imagePath: boolean;
};

export const Image = ({ id, setSizeImg, image, imagePath }: Img) => {
  const uid = useAppSelector((state) => state.person.id);
  const store = useAppSelector((store) => store.heroes.heroes);

  return (
    <>
      <div className={s.image}>
        <ImageContain uid={uid} image={image} imagePath={imagePath} setSizeImg={setSizeImg} />
      </div>
    </>
  );
};
