import { instance } from "../../helpers/api";

const getFavorites = () => {
  return instance
    .get(`/activities/favorites`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.warn("catch", error));
};

export { getFavorites };
