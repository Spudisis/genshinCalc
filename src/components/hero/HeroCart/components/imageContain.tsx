import React from "react";
import error from "../../../../assets/errorImg.png";
import { FindImage } from "../../../../utils";

import { getDownloadURL, listAll, ref } from "firebase/storage";

type Contain = {
  image: string;
  imagePath: boolean;
  uid: any;
  setSizeImg: (([n, b]: [T: number, U: number]) => void) | undefined;
};

export const ImageContain = ({ image, imagePath, uid, setSizeImg }: Contain) => {
  const refImg = React.useRef<HTMLImageElement>(null);

  const [imageFind, setImagefind] = React.useState(false); //проверка откуда изображаение fasle-ссылкой, true-с json'а
  const [imageCheck, setImageCheck] = React.useState(image); //отсюда берется изображение (ссылка или название)

  const onLoadImg = () => {
    if (refImg && refImg.current && setSizeImg) {
      setSizeImg([refImg.current.naturalHeight, refImg.current.naturalWidth]);
    }
  };

  React.useEffect(() => {
    //Откуда картинка
    const a = FindImage(image);

    //если картинка с Json
    if (a) {
      setImagefind(true);
      setImageCheck(a.img);
      //если с firebase
    } else {
      setImagefind(false);
      setImageCheck(image);
      //если картинка ссылкой
    }
  }, [image, uid]);

  return (
    <img
      ref={refImg}
      src={imageFind ? require("../../../../assets/heroes/" + imageCheck) : imagePath ? process.env.REACT_APP_BASE_URL+imageCheck :imageCheck}
      alt=""
      onError={() => setImageCheck(error)}
      onLoad={() => onLoadImg()}
    />
  );
};
