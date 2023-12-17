import { instance } from "../../helpers/api";

const getComments = (id) => {
  return instance
    .get(`/activities/${id}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("catch", error));
};

export { getComments };
