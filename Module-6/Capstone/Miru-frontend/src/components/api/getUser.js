import { instance } from "../../helpers/api";

const getUser = () => {
  return instance
    .get(`/user/profile`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.warn("catch", error));
};

export { getUser };
