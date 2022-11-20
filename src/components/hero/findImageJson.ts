import React from "react";
import json from "../../assets/heroes/heroes.json";
export const FindImage = (image: string) => {
  const findImage = (element: any) => {
    return element.name === image;
  };
  return json.find(findImage);
};
