export const findLocalStorage = (key: string) => {
  const typeLocal = localStorage.getItem(key);

  const res = typeLocal && (typeof JSON.parse(typeLocal) === "boolean" ? JSON.parse(typeLocal) : false);

  return [typeLocal, res];
};

export const findLocalStorageNumber = (key: string) => {
  const typeLocal = localStorage.getItem(key);

  const res = typeLocal && (typeof JSON.parse(typeLocal) === "number" ? JSON.parse(typeLocal) : 10);

  return [typeLocal, res];
};

export const setItemLocalStorage= (key: string, value: number | boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};
