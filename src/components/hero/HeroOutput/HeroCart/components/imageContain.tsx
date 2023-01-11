import React from "react";
import error from "../../../../../assets/errorImg.png";

type Contain = {
  imageFind: boolean;
  imageCheck: string;
  setImageCheck: (n: string) => void;
};

export const ImageContain = ({ imageFind, imageCheck, setImageCheck }: Contain) => {
  return (
    <img
      src={imageFind ? require("../../../../../assets/heroes/" + imageCheck) : imageCheck}
      alt=""
      onError={() => setImageCheck(error)}
    />
  );
};
