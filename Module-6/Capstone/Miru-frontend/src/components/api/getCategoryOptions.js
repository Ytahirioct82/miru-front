import { instance } from "../../helpers/api";

const getCategoryOptions = () => {
  return instance
    .get(`/categories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.warn("catch", error));
};

export { getCategoryOptions };
