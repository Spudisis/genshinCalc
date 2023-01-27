import { $authHost, $host } from "../../../api/index";

export const registration = async ({ email, password }: any) => {
  const { data } = await $authHost.post("api/person/registration", { login: email, password: password });
  console.log(data.userData);
  localStorage.setItem("token", data.userData.accessToken);
  return data;
};

export const login = async ({ email, password }: any) => {
  const { data } = await $authHost.post("api/person/login", { login: email, password });
  localStorage.setItem("token", data.userData.accessToken);
  return data;
};

export const logout = async () => {
  await $authHost.post("api/person/logout");
  localStorage.removeItem("token");
};
