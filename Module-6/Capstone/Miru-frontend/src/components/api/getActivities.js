import { instance } from "../../helpers/api";

const getActivities = (filters = {}) => {
  const { city, category } = filters;

  return instance
    .get(`/activities?city=${city}&category=${category}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("catch", error));
};

export { getActivities };
