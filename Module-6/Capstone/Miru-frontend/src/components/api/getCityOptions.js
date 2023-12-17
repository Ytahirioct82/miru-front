import { instance } from "../../helpers/api";

const getCityOptions = () => {
  return instance
    .get(`/cities`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.warn("catch", error));
};

export { getCityOptions };
