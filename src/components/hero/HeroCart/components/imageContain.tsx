import React from "react";
import error from "../../../../assets/errorImg.png";
import { FindImage } from "../../../../utils";

import { storage } from "../../../../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

type Contain = {
  image: string;

  setImageFirebase: (n: boolean) => void;
  uid: any;
};

export const ImageContain = ({ image, setImageFirebase, uid }: Contain) => {
  const [imageFind, setImagefind] = React.useState(false); //проверка откуда изображаение fasle-ссылкой, true-с json'а
  const [imageCheck, setImageCheck] = React.useState(image); //отсюда берется изображение (ссылка или название)

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
      displayImage(image);
    }
  }, [image]);
  const displayImage = async (image: string) => {
    const listRef = ref(storage, `images/${uid}/`);
    await listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (itemRef.name === image) {
            getDownloadURL(itemRef).then((getURL) => {
              setImageFirebase(true);
              setImageCheck(getURL);
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <img
      src={imageFind ? require("../../../../assets/heroes/" + imageCheck) : imageCheck}
      alt=""
      onError={() => setImageCheck(error)}
    />
  );
};
