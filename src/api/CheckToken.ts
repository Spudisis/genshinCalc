import { $host } from ".";

export const check = async () => {
  const { data } = await $host.get("api/person/refresh", { withCredentials: true });
  const { accessToken } = data.userData;
  localStorage.setItem("token", accessToken);
  return data;
};
