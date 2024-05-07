import axios from "axios";
const instance = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
});

export const fetchCurrentWeather = async (q = "") => {
  const { data } = await instance.get("/current.json", {
    params: {
      q: q,
      key: "7e3aa98d0d394983b9975256240705",
    },
  });
  return data;
};
