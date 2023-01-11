
import json from "../assets/heroes/heroes.json";
export const FindImage = (image: string) => {
  const findImage = (element: any) => {
    console.log(element.name === image, image);
    return element.name === image;
  };
  return json.heroes.find(findImage);
};
