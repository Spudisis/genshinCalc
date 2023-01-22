import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async ({ email, password }: any) => {
  const { data } = await $host.post("api/person/registration", { login: email, password: password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async ({ email, password }: any) => {
  const { data } = await $host.post("api/person/login", { login: email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
export const check = async () => {
  const { data } = await $authHost.get("api/person/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
