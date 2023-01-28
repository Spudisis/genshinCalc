import { createHeroForm } from "./CreateHero";

export const CreateFormData = (
  { name, date_start, date_end, valuePrimogems, valueStart, image, imagePath }: createHeroForm,
  id: number,
  objImg: string
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("date_start", date_start);
  formData.append("date_end", date_end);
  formData.append("valueDayByDay", `${valuePrimogems}`);
  formData.append("valueStart", `${valueStart}`);
  formData.append("image", image);
  formData.append("imagePath", `${imagePath}`);
  formData.append("img", objImg);
  formData.append("personId", `${id}`);
  return formData;
};
