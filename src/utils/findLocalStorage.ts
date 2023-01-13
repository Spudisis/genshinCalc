export const findLocalStorage = (key: string) => {
  const typeLocal = localStorage.getItem(key);

  const res = typeLocal && (typeof JSON.parse(typeLocal) === "boolean" ? JSON.parse(typeLocal) : false);

  return [typeLocal, res];
};

export const setItemLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value))
};
