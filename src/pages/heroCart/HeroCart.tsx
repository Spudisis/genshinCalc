import { useParams } from "react-router-dom";
import { Fields, Image } from "../../components";
import React from "react";
import s from "../style.module.scss";
import w from "./HeroCart.module.scss";
export const HeroCart = () => {
  const params = useParams();

  const [id, setId] = React.useState<string>(params.id!);
  const [sizeImg, setSizeImg] = React.useState<[T: number, U: number]>([0, 0]);

  React.useEffect(() => {
    console.log(sizeImg);
  }, [sizeImg]);
  return (
    <div className={s.root}>
      <div className={sizeImg[0] > sizeImg[1] ? w.vertically : sizeImg[0] < sizeImg[1] ? w.horizontally : ""}>
        <Image id={id} setSizeImg={setSizeImg} />
        <Fields />
      </div>
    </div>
  );
};
